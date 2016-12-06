const crypto = require('crypto');
const input = 'reyedfim';
const password = [];

for(var i=0;i<99999999;i++) {
  let hash = crypto.createHash('md5').update(input + i, 'utf8').digest('hex');
  if (hash.substring(0,5) === '00000') {
    password.push(hash.substring(5,6))
  }
  if (password.length == 8) {
    break;
  }
}

console.log('The password is:', password.join(''));
// f97c354d
