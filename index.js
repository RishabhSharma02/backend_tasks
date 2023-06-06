const obj = require("./second")
const os=require('os');
console.log("Hello world",obj)
console.log(os.cpus());
console.log(os.totalmem()/10240000000+"GB");