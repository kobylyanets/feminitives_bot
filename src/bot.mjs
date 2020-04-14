import Telegraf from 'telegraf';

import { proxyAgent } from './utils/proxyAgent';
import { i18n } from './locale/i18n';
import { feminitiveMessageConstructor } from './middlewares/feminitiveMessage';

export const setupBot = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN, {
    telegram: {
      agent: proxyAgent,
    },
  });

  bot.start(ctx => ctx.replyWithMarkdown(i18n.WELCOME_TEXT));
  bot.help(ctx => ctx.replyWithMarkdown(i18n.HELP_TEXT));

  bot.on('text', feminitiveMessageConstructor);

  return bot.launch();
};
