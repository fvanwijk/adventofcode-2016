require('./helpers').getFile(4, input => {
  const realRooms = input.split('\n').reduce((acc, line) => {
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
      acc.push({
        id: +id,
        checksum,
        tokens
      });
    }

    return acc;
  }, []);

  // Ceasar decipher room names
  const decodedNorthPoleObjectStorageRoom = realRooms.filter(room => {
    return room.tokens.join('-').split('').map(token => {
      if (token === '-') {
        token = ' ';
      } else {
        for(let i = 0; i < room.id; i++) {
          token = token === 'z' ? 'a' : String.fromCharCode(token.charCodeAt(0) + 1);
        }
      }
      return token;
    }).join('') === 'northpole object storage';
  });

  console.log('Room rooms sector ID sum:', realRooms.reduce((total, room) => total + room.id, 0));
  // 361724
  console.log('Room with the Northpole Object Storage:', decodedNorthPoleObjectStorageRoom[0].id);
  // 482
});
