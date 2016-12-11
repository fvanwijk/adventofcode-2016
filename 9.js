require('./helpers').getFile(9, input => {
  const output = [];

  for(let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char == '(') {
      // Read marker block and copy code to output
      const endMarkerIndex = input.indexOf(')', i) + 1;
      const marker = input.substring(i, endMarkerIndex);
      const [match, charCount, repeatCount] = marker.match(/\((\d+)x(\d+)\)/);
      const repeatGroup = input.substr(endMarkerIndex, charCount);
      for(j = 0;j < repeatCount;j++) {
        output.push(repeatGroup);
      }

      // Move cursor forward to continue
      i += marker.length + (charCount-1);
    } else {
      output.push(char);
    }
  }

  console.log('The length is:', output.length);
  // 183269
});
