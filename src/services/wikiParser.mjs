
const getWikiLine = wiki => {
  const definitionIndex = wiki.findIndex(line => line.match(/^.*==== Значение ====.*$/))
  if (line.match(/^.*==== Значение ====.*$/)) {
    return wiki[n + 1];
  }
  return wiki.findIndex(line => line.match(/^.*==== Значение ====.*$/));
};


export const parseWikiPage = page => {
  const wiki = page.split('\n');
  const line = getWikiLine(wiki);
  return line;
};
