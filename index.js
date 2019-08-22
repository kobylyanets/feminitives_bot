require('dotenv').config();

const Telegraf = require('telegraf');

// heroku bug https://github.com/telegraf/telegraf/issues/363#issuecomment-446361074
const express = require("express");
const expressApp = express();

const port = process.env.PORT || 3000
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
});
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
