require('./helpers').getFile(9, input => {
  function decompress(str, noNesting) {
    let output = 0;
    const markerIndex = str.indexOf('(');
    if (~markerIndex) {
      output += markerIndex; // Add first x normal chars
      const fullTail = str.slice(markerIndex);
      // marker + tail = fullTail
      const [match, charCount, repeatCount, tail] = fullTail.match(/\((\d+)x(\d+)\)(.*)/);

      // slice + next = tail
      const next = tail.slice(charCount);
      const slice = tail.substr(0, charCount);

      for(let j = 0;j < repeatCount;j++) {
        output += noNesting ? slice.length : decompress(slice);
      }
      output += decompress(next, noNesting);
    } else {
      output += str.length;
    }

    return output;
  }

  console.log('The initial length is:', decompress(input, true));
  // 183269

  console.log('The length is:', decompress(input)); // Watch out, takes a while...
  // 11317278863
});
