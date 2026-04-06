const crypto = require('crypto');
const fs = require('fs');

const SYM_ALGORITHM = 'aes-128-ctr';
const ASYM_PAD = crypto.constants.RSA_PKCS1_OAEP_PADDING;

function decryptPriv(encryptedB64, privateKey) {
  const decryptedBuffer = crypto.privateDecrypt({
    key: privateKey,
    padding: ASYM_PAD,
    oaepHash: 'sha256',
  }, Buffer.from(encryptedB64, 'base64'));
  return decryptedBuffer;
}

function decrypt(text, key, iv) {
  let encryptedText = Buffer.from(text, 'base64');
  let decipher = crypto.createDecipheriv(SYM_ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const privateKey = fs.readFileSync('encrypt/private.pem', 'utf8');
const { key: encryptedKey, iv: encryptedIV, data: encryptedData } = JSON.parse(
  fs.readFileSync('encrypt/messages.json', 'utf8')
);

const aesKey = decryptPriv(encryptedKey, privateKey);
const iv = decryptPriv(encryptedIV, privateKey);

encryptedData.forEach((msg, i) => {
  console.log(`[${i + 1}] ${decrypt(msg, aesKey, iv)}`);
});