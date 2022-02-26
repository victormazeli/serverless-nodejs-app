const { writeFileSync } = require('fs')
const { generateKeyPairSync } = require('crypto')

function generateKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', 
    {
            modulusLength: 4096,
            namedCurve: 'secp256k1', 
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'     
            },     
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: passphrase
            } 
    });
    
    writeFileSync('keys/private.pem', privateKey)
    writeFileSync('keys/public.pem', publicKey)
}
module.exports = {
    generateKeys
}