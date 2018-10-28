var fs = require('fs');
var html = fs.readFileSync("./index/index.html");
var url = require('url');
var main = require("../http.js");

function index(request,response,pos)
{
    if (pos >= 0)
    {
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        if ( query.percent ) 
        {
            response.write(query.percent);
        }
        response.end();
        return;
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<html><head><meta charset=\"utf-8\"></head><body><center><h1>INDEX</h1><br>");
    response.write("<table ><tr><td></td><td>Текущая<br> Скорость</td><td>Множитель</td><td>Коэфициент<br> обратной связи.</tr><tr align=\"center\"><td>Насос 1 \t</td><td>"+main.currspeed[0].toString()+"</td><td>"+main.mul[0].toString()+"</td><td>"+main.cofr[0].toString()+"</td></tr>");
    response.write("<tr align=\"center\"><td>Насос 2 \t</td><td>"+main.currspeed[1].toString()+"</td><td>"+main.mul[1].toString()+"</td><td>"+main.cofr[1].toString()+"</td></tr>");
    response.write("<a href=\"/timetable\">Расписание<\a><br>");
    response.write("<a href=\"/multiply\">Установка множителя<\a><br>");
    response.write("<a href=\"/start\">Запуск вне расписания<\a><br>");
    //response.write(html);
    response.write("</center></body></html>");
    
    response.end();
    
} 
module.exports.http = index; 
