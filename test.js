 function exout(error, stdout, stderr) {
  // command output is in stdout
    console.log(stderr);
    console.log(error);
}
 
 
 var exec = require('child_process').exec;
var args = process.argv.slice(2)
console.log(args);
exec("fast-gpio pwm "+args[0]+" "+args[1]+" 50",exout);
