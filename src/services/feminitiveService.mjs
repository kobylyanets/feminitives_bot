import isEmpty from 'lodash.isempty';

import { getException, makeFeminitives } from '../lib/feminitives/service';
import { i18n } from '../locale/i18n';

/**
 * Случайный элемент списка
 */
const randomWord = wordlist =>
  wordlist[Math.floor(Math.random() * wordlist.length)];

const capitalLetterWord = word => {
  if (!isEmpty(word)) {
    return word.replace(/(.)/, s => s.toUpperCase());
  }
  return '';
};

const getFirstInputWord = input =>
  input
    .trim()
    .toLowerCase()
    .replace(/<\/?[^>]+(>|$)/g, '')
    .split(' ')[0];

const getMainFeminitive = wordList => {
  const mainWord = randomWord(wordList);
  return `*${capitalLetterWord(mainWord)}*`;
};

const getFeminitivesList = wordList => wordList.join(' | ');

const getExceptionMessage = ([wordList, definition]) => `
${getMainFeminitive(wordList)}

_${i18n.femMessage.POSSIBLE_OPTION}:_
${getFeminitivesList(wordList)}

_${i18n.femMessage.DEFINITION}:_
${definition}
`;

const getEmptyFeminitivesMessage = word => `
*${capitalLetterWord(word)}*

_${i18n.femMessage.NO_FEMINITIVE_MESSAGE}_
`;

const getFeminitivesMessage = feminitives => `
${getMainFeminitive(feminitives)}

_${i18n.femMessage.POSSIBLE_OPTION}:_
${getFeminitivesList(feminitives)}
`;

export const constructFeminitiveMessage = input => {
  const word = getFirstInputWord(input);
  if (isEmpty(word)) {
    return i18n.femMessage.EMPTY_INPUT_TEXT;
  }
  const exception = getException(word);
  if (!isEmpty(exception)) {
    return getExceptionMessage(exception);
  }
  const feminitives = makeFeminitives(word);
  if (isEmpty(feminitives)) {
    return getEmptyFeminitivesMessage(word);
  }
  return getFeminitivesMessage(feminitives);
};
