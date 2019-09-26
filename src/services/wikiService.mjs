import fetch from 'node-fetch';
import isEmpty from 'lodash.isempty';
import { parseWikiPage } from './wikiParser';
import { convert, makeFeminitives } from '../lib/feminitives/service';

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

const femDefinition = definition => {
  const tokens =
    definition.match(/[\wа-яА-Яё]+|\d+| +|[.;,]|[^ \w\d\t.;,]+/gi) || [];
  const femDefinitionStr = tokens.map(w => makeFeminitives(w)[0] || w).join('');
  return convert(femDefinitionStr);
};

export const getDefinition = async term => {
  const page = await fetchWiktionary(term);
  if (!isEmpty(page)) {
    const definition = parseWikiPage(page);
    return femDefinition(definition);
  }
  return null;
};
