var crypto = require("crypto");
var path = require("path");
var fs = require("fs");
const passphrase = "myTesting"

const encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    let absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    let publicKey = fs.readFileSync(absolutePath, "utf8");
    let buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

const decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    let absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    let privateKey = fs.readFileSync(absolutePath, "utf8");
    let buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: passphrase,
        },
        buffer,
    )
    return decrypted.toString("utf8");
};
module.exports = {
    encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey
}