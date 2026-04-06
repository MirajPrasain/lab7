const crypto = require('crypto');
const fs = require('fs');

const SYM_ALGORITHM = 'aes-128-ctr';
const ASYM_PAD = crypto.constants.RSA_PKCS1_OAEP_PADDING;

function encrypt(text, key, iv) {
  let cipher = crypto.createCipheriv(SYM_ALGORITHM, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('base64');
}

function encryptPub(txt, publicKey) {
  const encryptedBuffer = crypto.publicEncrypt({
    key: publicKey,
    padding: ASYM_PAD,
    oaepHash: 'sha256',
  }, Buffer.from(txt));
  return encryptedBuffer.toString('base64');
}

const aesKey = crypto.randomBytes(16);
const iv = crypto.randomBytes(16);

let phrases = [
  'hello world!!!!!',
  'whatever whatever',
  'x, y, z, whatever',
  'this can be anything.... ☺️☺️☺️'
];

const publicKey = fs.readFileSync('encrypt/public.pem', 'utf8');

const output = {
  key: encryptPub(aesKey, publicKey),
  iv: encryptPub(iv, publicKey),
  data: phrases.map(phrase => encrypt(phrase, aesKey, iv))
};

fs.writeFileSync('encrypt/messages.json', JSON.stringify(output, null, 2));
console.log('Encrypted messages saved to encrypt/messages.json');