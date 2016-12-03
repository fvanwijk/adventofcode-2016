function checkTriangle(t) {
  const a = +t[0], b = +t[1], c = +t[2];
  return a + b > c
  && a + c > b
  && b + c > a
}

require('./helpers').getFile(3, input => {
  const validTriangles = input.split('\n').filter(line => {
    const [match, first, second, third] = line.match(/(\d+)\s+(\d+)\s+(\d+)/);
    return checkTriangle([first, second, third]) ;
  });

  console.log('Number of valid triangles:', validTriangles.length);
});
