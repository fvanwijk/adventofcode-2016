require('./helpers').getFile(4, input => {
  const realRoomsSectorIdTotal = input.split('\n').reduce((acc, line) => {
    const tokens = line.split('-');
    const [match, id, checksum] = tokens.splice(-1).join('').match(/(\d+)\[(\w+)\]/);

    // Count letters
    const letterCounts = tokens.join('').split('').reduce((counts, letter) => {
      counts[letter] = counts[letter] ? counts[letter] + 1 : 1;
      return counts;
    }, {});

    // Get the 5 most occurring letters
    const sortedCounts = [];
    for (letter in letterCounts) {
      sortedCounts.push({
        letter,
        count: letterCounts[letter]
      });
    }

    // Sort and add ID if top 5 matches checksum
    sortedCounts.sort((a, b) => {
      return a.count === b.count ? (a.letter > b.letter ? 1 : -1) : (a.count > b.count ? -1 : 1);
    });
    const countList = sortedCounts.slice(0, 5).map(count => count.letter).join('');
    if (checksum === countList) {
      acc += +id;
    }

    return acc;
  }, 0);

  console.log('Room rooms sector ID sum:', realRoomsSectorIdTotal);
  // 361724
});
