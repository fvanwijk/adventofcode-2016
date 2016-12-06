require('./helpers').getFile(6, input => {
  const counts = input.split('\n').reduce((acc, line) => {
    line.split('').forEach((char, i) => {
      acc[i][char] = acc[i][char] ? acc[i][char] + 1 : 1;
    });
    return acc;
  }, [{}, {}, {}, {}, {}, {}, {}, {}]);

  const countsArray = counts.reduce((word, letterCounts) => {
    let countWinner = [0];
    for (let letter in letterCounts) {
      if (countWinner[0] < letterCounts[letter]) {
        countWinner = [letterCounts[letter], letter];
      }
    }
    word.push(countWinner[1]);
    return word;
  }, []);

  console.log('The message is:', countsArray.join(''));
  // zcreqgiv
});
