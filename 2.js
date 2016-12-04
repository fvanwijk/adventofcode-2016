require('./helpers').getFile(2, input => {
  const lines = input.split('\n').map(line => line.split(''));
  const positions = [
    [false, false, 1, false, false],
    [false, 2, 3, 4, false],
    [5, 6, 7, 8, 9],
    [false, 'A', 'B', 'C', false],
    [false, false, 'D', false, false]
  ];
  let pos = [1, 1];
  let pos2 = [2, 0];
  const code = [];
  const code2 = [];

  lines.forEach(line => {
    line.forEach(move => {
      let posDelta;

      switch(move) {
        case 'U':
          posDelta = [-1,0];
          break;
        case 'D':
          posDelta = [1,0];
          break;
        case 'L':
          posDelta = [0,-1];
          break;
        case 'R':
          posDelta = [0,1];
          break;
      }

      let newPos = [pos[0] + posDelta[0], pos[1] + posDelta[1]]; // newPos may be invalid
      if (newPos[0] >= 0 && newPos[0] < 3 && newPos[1] >= 0 && newPos[1] < 3) {
        pos = newPos;
      }
      let newPos2 = [pos2[0] + posDelta[0], pos2[1] + posDelta[1]]; // newPos2 may be invalid
      if (positions[newPos2[0]] && positions[newPos2[0]][newPos2[1]]) {
        pos2 = newPos2;
      }
    });

    code.push(pos[0] * 3 + pos[1] + 1);
    code2.push(positions[pos2[0]][pos2[1]]);
  });

  console.log('The first bathroom code is:', code);
  // 95549
  console.log('The second bathroom code is:', code2);
  // D87AD
});
