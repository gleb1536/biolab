var http = require("http");
var exec = require('child_process').exec;
const  fork  = require('child_process').fork;
var timetable = require("./timetable/timetable.js");
var index = require("./index/index.js");
var multiply = require("./multiply/mul.js");
var start = require("./start/start.js");
var currspeed = [ 0, 0]; 
var mul = [ 1 , 1 ];
var cofr = [0 , 0 ];

var gpio_on = [ 15 , 11 ];
var gpio_pwm = [ 16 , 2 ];
var gpio_rev = [ 17 , 3 ];
var pr=[0,0];

function exout(error, stdout, stderr) {
  // command output is in stdout
    console.log(stderr);
    console.log(error);
}

for(var i=0; i<2;i++)
{
    exec("fast-gpio set-output "+ gpio_on[i],exout);
    exec("fast-gpio set-output "+ gpio_pwm[i],exout);
    exec("fast-gpio set-output "+ gpio_rev[i],exout);
    exec("fast-gpio set "+gpio_on[i]+" 1",exout);
}



function setspeed( id, speed)
{
    //console.log(speed);
    currspeed[id] = speed * mul[id] ;
    if(speed == 0)
    {
        exec("fast-gpio set "+gpio_on[id]+" 1",exout);
    }
    else{
        exec("fast-gpio set "+gpio_on[id]+" 0",exout);
	exec("pwm "+id.toString()+" "+(currspeed[id] * 106.6).toString()+" 50" , exout );
/*
        //exec("fast-gpio pwm "+gpio_pwm[id]+" "+currspeed[i]+" 50",exout);
        if(pr[id])
            pr[id].kill('SIGHUP');
        pr[id]=fork("./test.js",[gpio_pwm[id].toString(),(currspeed[id] * 106.6).toString()]);*/
    }
}



http.createServer(function(request, response) {
    var url = request.url;
    var pos = url.indexOf("?");
    if(pos >= 0)
        url = url.substring(0,pos);
    switch(url)
    {
        case '/':
            index.http(request,response,pos);
            break;
        case '/timetable':
        case '/timetable/':
            timetable.http(request,response,pos);
            break;
        case '/multiply':
            multiply.http(request,response,pos);
            break;
        case '/start':
            start.http(request,response,pos);
            break;
        default:
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("<center><h1>404\tPage not found!</h1></center>");
            response.end();
            console.log(request.url);
            break;
        
    }
}).listen(80);


module.exports.setspeed = setspeed;
module.exports.currspeed = currspeed;
module.exports.mul = mul;
module.exports.cofr = cofr;
