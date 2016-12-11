require('./helpers').getFile(8, input => {
  function arrayRotate(arr, count) {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
  }

  /*  input = `rect 3x2
   rotate column x=1 by 1
   rotate row y=0 by 4
   rotate column x=1 by 1`;*/

  const height = 6;
  const width = 50;
  const initArray = [];
  for (let i = 0; i < height; i++) {
    initArray[i] = new Array(width).fill(false);
  }

  const keypad = input.split('\n').reduce((acc, line) => {
    const command = line.split(' ');
    if (command[0] == 'rect') {
      // Fill rect from x width and y tall with 'true'
      const [match, x, y] = command[1].match(/(\d+)x(\d+)/);
      for (let i = 0; i < +x; i++) {
        for (let j = 0; j < +y; j++) {
          acc[j][i] = true;
        }
      }
    } else {
      let [rotate, direction, position, by, steps] = command;
      const [axis, positionIndex] = position.match(/\w=(\d+)/);
      if (direction == 'row') {
        acc[positionIndex] = arrayRotate(acc[positionIndex], -steps);
      } else {
        const col = acc.map(row => row[positionIndex]);
        const rotatedCol = arrayRotate(col, -steps);
        acc.forEach((row, i) => {
          row[positionIndex] = col[i];
        });
      }
    }

    return acc;
  }, initArray);

  const count = keypad.reduce((count, row) => row.reduce((x, y) => x + y, count), 0);
  const readableKeyPad = keypad.map(x => x.map(y => y ? '*' : ' ').join(''));

  console.log('The code is:', count);
  // 128
  console.log(readableKeyPad.join('\n'));
  // EOARGPHYAO
});
