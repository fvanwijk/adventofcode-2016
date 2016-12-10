require('./helpers').getFile(7, input => {
  const result = input.split('\n').reduce((acc, line, i) => {
    var matches = line.match(/([^\[\]$]+)+/g);

    // Create supernet and hypernet lists with triples
    const groupMatches = matches.reduce((acc2, wordGroup, i) => {

      // Validates ABBA match (intermediate result)
      const hasAbba = wordGroup.search(/([a-z])((?!\1).)\2\1/g) != -1;
      acc2.abba[i % 2] = i % 2 ? (acc2.abba[i % 2] && !hasAbba) : (acc2.abba[i % 2] || hasAbba);

      // Matches ABA in supernet or hypernet and adds to the respective list
      const abaMatches = [];
      let val;
      const abaReg = /(\w)(?=([^\1]\1))/g;
      while (val = abaReg.exec(wordGroup)) {
        abaMatches.push(val[1] + val[2]);
      }
      if (abaMatches) {
        acc2.aba[i % 2] = acc2.aba[i % 2].concat(abaMatches);
      }

      return acc2;
    }, { abba: [false, true], aba: [[],[]] });

    // Aggregate line: validation on ABBA rules
    if (groupMatches.abba[0] && groupMatches.abba[1]) {
      acc.abba++;
    }

    // Aggregate line: validation on ABA rules
    if (groupMatches.aba[0].some(word => {
        return groupMatches.aba[1].indexOf(word[1] + word[0] + word[1]) !== -1;
      })) {
      acc.aba++;
    }
    return acc;
  }, { abba: 0, aba: 0 });

  console.log('Number of TLS email adresses:', result.abba);
  // 118
  console.log('Number of SSL email adresses:', result.aba);
  // 260
});
