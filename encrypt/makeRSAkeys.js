
const crypto = require('crypto');
const fs = require('fs');
 
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});
 
fs.writeFileSync('encrypt/public.pem', publicKey);
fs.writeFileSync('encrypt/private.pem', privateKey);
 
console.log('RSA key pair generated.');
console.log('  -> encrypt/public.pem');
console.log('  -> encrypt/private.pem');
 