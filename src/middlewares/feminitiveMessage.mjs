import { constructFeminitiveMessage } from '../services/feminitiveService';

export const feminitiveMessageConstructor = async ctx => {
  const input = ctx.message && ctx.message.text;
  ctx.replyWithMarkdown(await constructFeminitiveMessage(input));
};
