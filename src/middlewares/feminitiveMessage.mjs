import isEmpty from 'lodash.isempty';
import { i18n } from '../locale/i18n';

const getFirstInputWord = input => input
  .trim()
  .toLowerCase()
  .replace(/<\/?[^>]+(>|$)/g, '')
  .split(' ')[0];

export const feminitiveMessageConstructor = async (ctx) => {
  const input = ctx.message && ctx.message.text;
  const word = getFirstInputWord(input);
  if (isEmpty(word)) {
    ctx.reply(i18n.femMessage.EMPTY_INPUT_TEXT);
    return;
  }
  ctx.replyWithMarkdown('txt');
};


// bot.on('text', async (ctx) => {
//   const input = ctx.message && ctx.message.text;
//   const word = input
//     .trim()
//     .toLowerCase()
//     .replace(/<\/?[^>]+(>|$)/g, '')
//     .split(' ')[0];
//   if (!word) {
//     ctx.reply('Введите слово!');
//     return;
//   }
//   let feminitives = [];
//   if (FEM.exceptions.contains(word)) {
//     feminitives = FEM.exceptions.feminitives(word);
//   } else {
//     feminitives = makeFeminitives(word);
//   }
//   feminitives = makeFeminitives(word);
//   // const result =
//   //   (feminitives &&
//   //     feminitives[1] &&
//   //     feminitives[1].join &&
//   //     feminitives[1].join(" | ")) ||
//   //   "Это слово и так прекрасно. Оставим его как есть.";
//   // const md =
//   //   "" +
//   `*${feminitives && feminitives[0] && feminitives[0].replace
// && feminitives[0].replace(/(.)/, s => s.toUpperCase())}*\n \n` +
//   //   "Возможные варианты:\n" +
//   //   `${(feminitives && feminitives[1].join && feminitives[1].join(" | ")) ||
//   //     "Это слово и так прекрасно. Оставим его как есть."}`;
//   // const result1 = await get_wiktionary('женщина', ctx);
//   return ctx.replyWithMarkdown(feminitives.join(' | '));
// });
