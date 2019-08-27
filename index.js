require('dotenv').config();

const Telegraf = require('telegraf');

// For local debug
const ProxyAgent = require('proxy-agent');

const proxyUri = `${process.env.PROXY_PROTOCOL}://${process.env.PROXY_LOGIN}:${
  process.env.PROXY_PSSWD
  }@${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`;
const proxyAgent = new ProxyAgent(proxyUri);

const lib = require('./lib/feminitives');
const make_feminitives = lib.make_feminitives;
const FEM = lib.FEM;

const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: {
    agent: proxyAgent,
  }
});
bot.start((ctx) => ctx.replyWithMarkdown(`
При помощи этой небольшой программы,
реализующей феминистическую логику, 
вы сами можете создать феминитивы к любому слову.
Попробуйте: автор, врач.
`));
bot.help((ctx) => ctx.reply(`
ФЕМИНИТИВЫ – это слова женского рода, 
альтернативные или парные аналогичным понятиям мужского рода, 
относящимся ко всем людям независимо от их пола.`
));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.on('text', (ctx) => {
  const input = ctx.message && ctx.message.text;
  const word = input.trim().toLowerCase().replace(/<\/?[^>]+(>|$)/g, "").split(" ")[0];
  if (!word) {
    ctx.reply('Введите слово!');
    return;
  }
  let feminitives = [];
  if (FEM.exceptions.contains(word)) {
    feminitives = FEM.exceptions.feminitives(word);
  } else {
    feminitives = make_feminitives(word);
  }
  const result = (feminitives && feminitives[1] && feminitives[1].join && feminitives[1].join(" | "))
    || "Это слово и так прекрасно. Оставим его как есть.";
  ctx.reply(result);
});
bot.launch();
