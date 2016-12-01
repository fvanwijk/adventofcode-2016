require('./helpers').getFile(1, input => {
  const data = input.split(', ');
  const result = data.reduce((pos, direction) => {
    const [ match, bearing, steps, x, y ] = direction.match(/([LR])(\d+)/);

    // Determine new bearing
    pos.bearing = (pos.bearing + 360 + (bearing === 'R' ? 90 : -90)) % 360;

    // Walk
    switch (pos.bearing) {
      case 0:
        pos.y += +steps;
        break;
      case 90:
        pos.x += +steps;
        break;
      case 180:
        pos.y -= +steps;
        break;
      case 270:
        pos.x -= +steps;
        break;
    }

    return pos;
  }, { x: 0, y: 0, bearing: 0 });

  console.log('Blocks away from destination: ', Math.abs(result.x) + Math.abs(result.y));
  // 301
});
