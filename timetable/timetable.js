var fs = require('fs');
var url = require('url');
var main  = require("../http.js");
var htmlu = fs.readFileSync("./timetable/index_up.html");
var htmld = fs.readFileSync("./timetable/index_down.html");
var timetable;
var path = "./timetable/timetable.txt";
fs.readFile(path, 'utf8', function (err, data) {
        if (err) throw err;
        timetable = data.toString().split(",");
        }
    );

var line, begtime, endtime, speed;


function time(request,response,pos)
{
    if (pos >= 0)
    {
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        timetable = [];
        var wfd;
            if ( typeof(query.begtime) == "string" )
            {
                timetable.push(query.begtime + "\t" + query.endtime + "\t" + query.speed);
            }
            else
            {
                for(var i = 0; i < query.begtime.length ; i++)
                {
                    timetable[i] = query.begtime[i] + "\t" + query.endtime[i] + "\t" + query.speed[i];
                }
            }
        fs.writeFile(path,timetable,function(err) {
            if (err) throw err;
                //console.log('complete');
            }
        );
        //console.log("ok\n"+timetable);
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<center><a href=\"/\">Назад<\a><br></center>");
    response.write(htmlu);
    for(var i = 0 ; i < timetable.length ; i++)
    {
        line = timetable[i].split("\t");
        response.write("<tr><td><input type='button' class='delete' value='-'/></td>");
        response.write("<td><input type='time' name='begtime' value="+line[0]+"></td>");
        response.write("<td><input type='time' name='endtime' value="+line[1]+"></td>");
        response.write("<td><input name='speed' value="+line[2]+"></td></tr>");
    }
    response.write(htmld);
    response.end();
    
} 
function cron()
{
    var date = new Date();
    var hor = date.getHours();
    var min = date.getMinutes();
    var str = hor.toString()+":"+min.toString();
    for(var i = 0 ; i < timetable.length ; i++)
    {
        line = timetable[i].split("\t");
        if( line[0] == str )
        {
            var sp = parseFloat(line[2]);
            main.setspeed(0,sp);
            main.setspeed(1,sp);
        }
        if( line[1] == str )
        {
            main.setspeed(0,0);
            main.setspeed(1,0);
        }
    }
}
module.exports.http = time;
module.exports.timetable = timetable;
while(true)
{
    var date = new Date();
    var sec = date.getSeconds();
    if(sec == 0)
    {
        setInterval(cron,60000);
        break;
    }
}
