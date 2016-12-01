require('./helpers').getFile(1, input => {
  function getDistance(coord) {
    return Math.abs(coord.x) + Math.abs(coord.y);
  }

  const walks = {
    0: { x: 0, y: 1 },
    90: { x: 1, y: 0 },
    180: { x: 0, y: -1 },
    270: { x: -1, y: 0 },
  };
  const result = input.split(', ').reduce((pos, direction) => {
    const [ match, bearing, steps ] = direction.match(/([LR])(\d+)/);

    // Determine new bearing
    pos.bearing = (pos.bearing + 360 + (bearing === 'R' ? 90 : -90)) % 360;

    // Walk
    for (let i = 0; i < steps; i++) {
      let walk = walks[pos.bearing];
      pos.x += walk.x;
      pos.y += walk.y;

      // Check if already visited this block
      let newPos = `${pos.x}-${pos.y}`;
      if (pos.blocks[newPos]) {
        pos.visitedTwicePositions.push({ x: pos.x, y: pos.y });
      }
      pos.blocks[newPos] = true;
    }

    return pos;
  }, { x: 0, y: 0, bearing: 0, blocks: {}, visitedTwicePositions: [] });

  console.log('Blocks away from destination: ', getDistance(result));
  // 301
  console.log('Blocks away to first twice visited position: ', getDistance(result.visitedTwicePositions[0]));
  // 130
});
