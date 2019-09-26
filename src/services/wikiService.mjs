import fetch from 'node-fetch';
import isEmpty from 'lodash.isempty';
import {parseWikiPage} from "./wikiParser";

const getWikiUrl = term =>
  encodeURI(`https://ru.wiktionary.org/w/index.php?action=raw&title=${term}`);

const fetchWiktionary = async term => {
  const res = await fetch(getWikiUrl(term), {
    method: 'GET',
  });
  if (res.ok) {
    return res.text();
  }
  return null;
};

// Поиск и феминизация дефиниции в викистранице
function parseWikiPage1(page) {
  const wiki = page.split('\n');
  let definition = '';

  wiki.some((line, n) => {
    if (line.match(/^.*==== Значение ====.*$/)) {
      // console.log(wiki[n + 1]); // DEBUG
      definition = wiki[n + 1]
        .replace(/^# ?/, '') // # дефиниция
        .replace(/\[{2}([^\]|]*)]{2}/g, '$1') // [[1]]
        .replace(/\[{2}[^|]*\|([^\]]*)]{2}/g, '$1') // [[1|2]]
        .replace(/\[{2}([^\]|]*)}{2}/g, '$1') // {{1}}
        .replace(/{{2}[^{}]*}{2} ?/g, '') // {{1|2}}
        .replace(/{{2}[^{}]*\|.*/g, '') // {{1|слово<!--комментарий-->.*$
        .replace(/{{2}[^{}]*}{2} ?/g, '') // ~ : возможна вложенность
        .replace(/\[[0-9]+]/g, '') // ссылки [n]
        .replace(/^ *, */g, '') // ^, ...
        .replace(/ ?$/, '.'); // Точка в конце предложения
      return true;
    }
  });

  // Разделение дефиниции на массив слов и знаков препинания и феминизация слов
  // const tokens = definition.match(/[\wа-яА-Яё]+|\d+| +|[.;,]|[^ \w\d\t.;,]+/ig) || [];
  return definition;
  // console.log(tokens);

  // Замена местоимений, предлогов и проч.
  // return FEM.words.convert(tokens.map(w => make_feminitives(w)[0]).join(""));

  // DEBUG
  // console.log(definition);
  // console.log(tokens);
}

export const getDefinition = async term => {
  const page = await fetchWiktionary(term);
  if (!isEmpty(page)) {
    parseWikiPage(page);
    return parseWikiPage1(page);
  }
  return null;
};
