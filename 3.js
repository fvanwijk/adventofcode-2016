require('./helpers').getFile(3, input => {
  const validTriangles = input.split('\n').filter(line => {
    const [match, first, second, third] = line.match(/(\d+)\s+(\d+)\s+(\d+)/);
    return +first + +second > +third
           && +first + +third > +second
           && +second + +third > +first;
  });

  console.log('Number of valid triangles:', validTriangles.length);
});
