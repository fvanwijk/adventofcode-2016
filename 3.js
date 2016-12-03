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

  const validColumnTriangles = input.replace(/\n/g, '').match(/(\d+)/g).reduce((sides, side, i) => {
    sides.groupsOf3[i % 3].push(side);
    // Check every 3 triangles and add to final list if it is a triangle
    if (i % 9 == 8) {
      let validGroups = sides.groupsOf3.filter(checkTriangle);
      sides.triangles = sides.triangles.concat(validGroups);
      sides.groupsOf3 = [[], [], []];
    }
    return sides;
  }, { triangles: [], groupsOf3: [[], [], []]}).triangles;

  console.log('Number of valid triangles:', validTriangles.length);
  // 993
  console.log('Number of valid triangles in columns:', validColumnTriangles.length);
  // 1849
});
