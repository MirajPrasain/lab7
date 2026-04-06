const bcrypt = require('bcrypt');
const fs = require('fs');

const HASH_FILE = 'password.txt';

const password = process.argv[2];

if (!password) {
  console.error('Usage: node hash/checkhash.js <password>');
  process.exit(1);
}

const storedHash = fs.readFileSync(HASH_FILE, 'utf8').trim();

if (bcrypt.compareSync(password, storedHash)) {
  console.log('Match successful');
} else {
  console.log('Invalid password');
}