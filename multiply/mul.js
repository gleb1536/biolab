var fs = require('fs');
var html = fs.readFileSync("./multiply/index.html");
var url = require('url');
var main = require("../http.js");

function index(request,response,pos)
{
    if (pos >= 0)
    {
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        if ( query.id && query.multiply ) 
        {
            main.mul[ parseInt(query.id , 10) ] = parseFloat( query.multiply );
        }
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<center><a href=\"/\">Назад<\a><br></center>");
    response.write(html);    
    response.end();
    
} 
module.exports.http = index; 
