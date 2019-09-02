import isEmpty from 'lodash.isempty';

import { endings } from './endings';

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
 * @returns {string}
 */
const constructFeminitive = (stem, ending) => `${stem} \u26A7 ${ending}`;

/**
 * Создание массива с феминитивами
 *
 * @param word: String
 * @returns {*[]}
 */
export const makeFeminitives = (word) => {
  if (isEmpty(word) || word.length < 3) {
    return [word];
  }
  const currentEnding = word.slice(-2); // Текущее окончание
  const feminitives = [];             // Массив феминитивов

  Object.entries(endings).forEach(([femEnding, ends]) => {
    ends.forEach((end) => {
      if (endingRegExp(end).test(currentEnding)) {
        const stem = offset(end) === 0 ? word : word.slice(0, -offset(end));
        feminitives.push(constructFeminitive(stem, femEnding));
      }
    });
  });
  return feminitives;
};
