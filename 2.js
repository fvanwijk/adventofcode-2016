require('./helpers').getFile(2, input => {
  const lines = input.split('\n').map(line => line.split(''));

  let pos = [1, 1];
  const code = [];
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
    });

    code.push(pos[0] * 3 + pos[1] + 1);
  });

  console.log('The bathroom code is:', code);
});
