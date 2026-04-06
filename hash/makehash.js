const bcrypt = require('bcrypt');
const fs = require('fs');

const HASH_FILE = 'password.txt';

const password = process.argv[2];

if (!password) {
  console.error('Usage: node hash/makehash.js <password>');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());

fs.writeFileSync(HASH_FILE, hash);
console.log('Hash saved to password.txt');
console.log(hash);