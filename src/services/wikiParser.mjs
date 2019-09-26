import isEmpty from 'lodash.isempty';

const isIndexExists = index => index >= 0;

const findDefinitionIndex = wiki => {
  const definitionTitleIndex = wiki.findIndex(line => line.match(/^.*==== Значение ====.*$/));
  if (isIndexExists(definitionTitleIndex)) {
    return definitionTitleIndex + 1;
  }
  return null;
};

const getDefinitionLine = wiki => {
  const definitionIndex = findDefinitionIndex(wiki);
  if (isIndexExists(definitionIndex)) {
    return wiki[definitionIndex];
  }
  return null;
};

const parseDefinitionLine = line => line.replace(/^# ?/, '') // # дефиниция
      .replace(/\[{2}([^\]|]*)]{2}/g, '$1') // [[1]]
      .replace(/\[{2}[^|]*\|([^\]]*)]{2}/g, '$1') // [[1|2]]
      .replace(/\[{2}([^\]|]*)}{2}/g, '$1') // {{1}}
      .replace(/{{2}[^{}]*}{2} ?/g, '') // {{1|2}}
      .replace(/{{2}[^{}]*\|.*/g, '') // {{1|слово<!--комментарий-->.*$
      .replace(/{{2}[^{}]*}{2} ?/g, '') // ~ : возможна вложенность
      .replace(/\[[0-9]+]/g, '') // ссылки [n]
      .replace(/^ *, */g, '') // ^, ...
      .replace(/ ?$/, '.') // Точка в конце предложения
;

export const parseWikiPage = page => {
  const wiki = page.split('\n');
  const line = getDefinitionLine(wiki);
  if (!isEmpty(line)) {
    return parseDefinitionLine(line);
  }
  return null;
};
