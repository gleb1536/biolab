var fs = require("fs");
fs.open("/dev/ttyS1", "r+", function(err, fd) {
    if(err) throw err;
    var input = fs.createReadStream("/dev/ttyS1", {"fd": fd});
    input.on("data", function(chunk) {
        console.log("in:", chunk);
    });
});
