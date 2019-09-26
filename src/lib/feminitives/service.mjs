import isEmpty from 'lodash.isempty';

import { endings } from './endings';
import { exceptions } from './exceptions';

const UNDERSCORE_GAP = '_';
const GENDER_GAP = '\u26A7';

/**
 * Первый элемент списка - окончание (в виде регулярного выражения)
 *
 * @param tuple
 * @returns {RegExp}
 */
const endingRegExp = tuple => new RegExp(`^.*${tuple[0]}$`, 'i');

/**
 * Второй элемент списка - смещение
 *
 * @param tuple
 * @returns {*}
 */
const offset = tuple => tuple[1];

/**
 * Конструирование феминитива с gender_gap
 * @param stem
 * @param ending
 * @param gap
 * @returns {string}
 */
const constructFeminitive = (stem, ending, gap = GENDER_GAP) => `${stem} ${gap} ${ending}`;

/**
 * Создание массива с феминитивами
 *
 * @param word: String
 * @returns {*[]}
 */
export const makeFeminitives = word => {
  if (isEmpty(word) || word.length < 3) {
    return [];
  }
  const currentEnding = word.slice(-2); // Текущее окончание
  const feminitives = []; // Массив феминитивов

  Object.entries(endings).forEach(([femEnding, ends]) => {
    ends.forEach(end => {
      if (endingRegExp(end).test(currentEnding)) {
        const stem = offset(end) === 0 ? word : word.slice(0, -offset(end));
        feminitives.push(constructFeminitive(stem, femEnding));
      }
    });
  });
  return feminitives;
};

/**
 *  Проверка на исключение
 */
export const getException = word => {
  if (Object.keys(exceptions).includes(word)) {
    return exceptions[word];
  }
  return null;
};
