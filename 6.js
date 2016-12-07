require('./helpers').getFile(6, input => {
  const counts = input.split('\n').reduce((acc, line) => {
    line.split('').forEach((char, i) => {
      acc[i][char] = acc[i][char] ? acc[i][char] + 1 : 1;
    });
    return acc;
  }, [{}, {}, {}, {}, {}, {}, {}, {}]);

  const countsArray = counts.reduce((word, letterCounts) => {
    let countWinner = [0];
    let countLoser = [99999];
    for (let letter in letterCounts) {
      if (countWinner[0] < letterCounts[letter]) {
        countWinner = [letterCounts[letter], letter];
      }
      if (countLoser[0] > letterCounts[letter]) {
        countLoser = [letterCounts[letter], letter];
      }
    }
    word.winner.push(countWinner[1]);
    word.loser.push(countLoser[1]);
    return word;
  }, {loser:[],winner:[]});

  console.log('The message is:', countsArray.winner.join(''));
  // zcreqgiv
  console.log('The second message is:', countsArray.loser.join(''));
  // pljvorrk
});
