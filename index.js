const express = require("express");
const {Alghorithm}=require("./util/algorithm")
const app =express();
app.use(express.json());
// app.use("/api",require("./routes/app.routes"))
app.listen(4000,function(){
    console.log("Server is running on port 4000")
})


const algorithm = new Alghorithm()
const keysAndIV = algorithm.createIVandKey();
console.log(keysAndIV.key)
console.log(keysAndIV.iv)
const encryptedData = algorithm.encrypt({
    iv: keysAndIV.iv,
    key: keysAndIV.key,
    data: 'SALAM'
});
console.log(encryptedData)
const decryptedData = algorithm.decrypt({
    iv: keysAndIV.iv,
    key: keysAndIV.key,
    data: encryptedData
});
console.log(decryptedData)
const data = algorithm.encryptWithRAZalghorithm("SALAM")
console.log(data)
console.log(algorithm.decryptWithRAZalghorithm(data))



