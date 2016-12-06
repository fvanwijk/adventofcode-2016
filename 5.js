const crypto = require('crypto');
const input = 'reyedfim';
const password = [];
const positionPassword = [];

for(var i=0;i<99999999;i++) {
  let hash = crypto.createHash('md5').update(input + i, 'utf8').digest('hex');
  if (hash.substring(0,5) === '00000') {
    if (password.length < 8) {
      password.push(hash.substring(5,6));
    }

    const position = hash.substring(5,6);
    if (position < 8 && !positionPassword[position]) {
      positionPassword[position] = hash.substring(6,7);
    }
  }
  if (password.length > 7 && positionPassword.join('').length > 7) {
    break;
  }
}

console.log('The password is:', password.join(''));
// f97c354d

console.log('The second password is:', positionPassword.join(''));
// 863dde27
