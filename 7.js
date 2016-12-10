require('./helpers').getFile(7, input => {
  const abaReg = /(\w)(?=([^\1]\1))/g;
  const result = input.split('\n').reduce((acc, line, i) => {

    // Create supernet and hypernet lists with triples
    const groupMatches = line.match(/([^\[\]$]+)+/g).reduce((acc2, wordGroup, i) => {

      // Validates ABBA match (intermediate result)
      acc2.abba[i % 2] |= /(\w)((?!\1)\w)\2\1/.test(wordGroup);

      // Matches ABA in supernet or hypernet and adds to the respective list
      let val;
      while (val = abaReg.exec(wordGroup)) {
        acc2.aba[i % 2].push(val[1] + val[2]);
      }
      return acc2;
    }, { abba: [0, 0], aba: [[],[]] });

    // Aggregate line: validation on ABBA rules
    acc.abba += groupMatches.abba[0] & ~groupMatches.abba[1];

    // Aggregate line: validation on ABA rules
    acc.aba += groupMatches.aba[0].some(word => ~groupMatches.aba[1].indexOf(word[1] + word[0] + word[1]));
    return acc;
  }, { abba: 0, aba: 0 });

  console.log('Number of TLS email adresses:', result.abba);
  // 118
  console.log('Number of SSL email adresses:', result.aba);
  // 260
});
