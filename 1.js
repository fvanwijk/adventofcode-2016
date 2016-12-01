require('./helpers').getFile(1, input => {
  function getDistance(coord) {
    return Math.abs(coord.x) + Math.abs(coord.y);
  }

  const result = input.split(', ').reduce((pos, direction) => {
    const [ match, bearing, steps ] = direction.match(/([LR])(\d+)/);

    // Determine new bearing
    pos.bearing = (pos.bearing + 360 + (bearing === 'R' ? 90 : -90)) % 360;
    let rad = pos.bearing / 180 * Math.PI;

    // Walk
    for (let i = 0; i < steps; i++) {
      pos.x += Math.round(Math.sin(rad));
      pos.y += Math.round(Math.cos(rad));

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
