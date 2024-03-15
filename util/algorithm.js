const crypto = require('crypto');
class Alghorithm{
 encryptWithRAZalghorithm(data) {
    let char = crypto.randomBytes(1).toString('hex');  
    let indexList = char.split('').map(char => char.charCodeAt(0));
    let sum = indexList.reduce((acc, cur) => acc + cur, 0);
    let encode = data;
    for (let i = 0; i < ((sum % 3) + 1); i++) {
        let encodedB64 = Buffer.from(encode).toString('base64');
        let reverse = encodedB64.split('').reverse().join('');
        encode = reverse;
    }
    return encode + char;
 }
 decryptWithRAZalghorithm(data) {
    let length = data.length;
    let lastTwoCharacters = data.substring(length - 2);
    let indexList = lastTwoCharacters.split('').map(char => char.charCodeAt(0));
    let sum = indexList.reduce((acc, cur) => acc + cur, 0);
    let encryptedData = data.substring(0, length - 2);
    let encode = encryptedData;
    for (let i = 0; i < ((sum % 3) + 1); i++) {
        let finalReverse = encode.split('').reverse().join('');
        let decodedBytes = Buffer.from(finalReverse, 'base64');
        encode = decodedBytes.toString('utf-8');
    }
    return encode;
 }
 
 encrypt({data, key, iv}) {
    const prepareIv = Buffer.from(iv, 'hex');
    const prepareKey = Buffer.from(key, 'hex');
    const dataDecrypted = Buffer.from(data, 'utf8'); // Specify input encoding as 'utf8'
    const cipher = crypto.createCipheriv('aes-256-cbc', prepareKey, prepareIv);
    let encrypted = cipher.update(dataDecrypted, null, 'base64'); // Specify input encoding as null
    encrypted += cipher.final('base64');
    return encrypted;
 }
 decrypt({data, key, iv}) {
    const prepareIv = Buffer.from(iv, 'hex');
    const prepareKey = Buffer.from(key, 'hex');
    const encryptedData = Buffer.from(data, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', prepareKey, prepareIv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8'); // Specify input encoding as 'base64' and output encoding as 'utf8'
    decrypted += decipher.final('utf8');
    return decrypted;
 }

 createIVandKey(){
    let iv = crypto.randomBytes(16).toString('hex');
    let key = crypto.randomBytes(32).toString('hex');
    return {iv, key};
 }

 
}

exports.Alghorithm = Alghorithm;
