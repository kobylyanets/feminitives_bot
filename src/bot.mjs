import Telegraf from "telegraf";

import { proxyAgent } from "./utils/proxyAgent";
import { i18n } from "./locale/i18n";
import {make_feminitives, FEM, get_wiktionary} from "../lib/feminitives";

export const setupBot = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN, {
    telegram: {
      agent: proxyAgent
    }
  });

  bot.start(ctx => ctx.replyWithMarkdown(i18n.welcome));
  bot.help(ctx => ctx.replyWithMarkdown(i18n.help));

  bot.on("text", async ctx => {
    const input = ctx.message && ctx.message.text;
    const word = input
      .trim()
      .toLowerCase()
      .replace(/<\/?[^>]+(>|$)/g, "")
      .split(" ")[0];
    if (!word) {
      ctx.reply("Введите слово!");
      return;
    }
    let feminitives = [];
    if (FEM.exceptions.contains(word)) {
      feminitives = FEM.exceptions.feminitives(word);
    } else {
      feminitives = make_feminitives(word);
    }
    const result =
      (feminitives &&
        feminitives[1] &&
        feminitives[1].join &&
        feminitives[1].join(" | ")) ||
      "Это слово и так прекрасно. Оставим его как есть.";
    const md =
      "" +
      `*${feminitives && feminitives[0] && feminitives[0].replace && feminitives[0].replace(/(.)/, s => s.toUpperCase())}*\n \n` +
      "Возможные варианты:\n" +
      `${(feminitives && feminitives[1].join && feminitives[1].join(" | ")) ||
        "Это слово и так прекрасно. Оставим его как есть."}`;
    const result1 = await get_wiktionary('женщина', ctx);
    return ctx.replyWithMarkdown(md);
  });

  return bot.launch();
};
