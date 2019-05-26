grassArr = [];
eatArr = [];
gisArr = [];
lionArr = [];
lion2Arr = [];
vorArr = [];
matrix = [
    [0, 1, 0, 3, 2, 2, 0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 1],
    [0, 1, 1, 3, 0, 2, 1, 0, 1, 0, 0, 1, 1, 1, 3, 1, 1],
    [0, 1, 0, 0, 0, 1, 3, 0, 1, 3, 1, 2, 2, 1, 1, 1, 1],
    [0, 1, 0, 3, 4, 1, 1, 0, 1, 2, 1, 2, 1, 1, 2, 1, 1],
    [0, 1, 4, 0, 0, 1, 1, 0, 1, 2, 3, 1, 1, 4, 1, 1, 1],
    [0, 1, 0, 0, 2, 1, 1, 0, 1, 0, 0, 1, 1, 4, 1, 1, 1],
    [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 2, 1],
    [0, 1, 2, 1, 2, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 1, 1],
    [3, 1, 1, 1, 0, 1, 0, 3, 1, 2, 0, 1, 1, 1, 3, 1, 1],
    [0, 1, 1, 1, 2, 1, 0, 3, 1, 0, 0, 1, 1, 3, 2, 1, 1],
    [2, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 0, 1, 2, 1, 0, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1],
];


var Eatgrass = require("./modules/Eatgrass.js")
var Grass = require("./modules/grass.js")
var Gishatich = require("./modules/gishatich.js")
var Lion = require("./modules/Lion.js")
var Vorsord = require("./modules/Vorsord.js")
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(4000);


let obj = {
    'matrix': matrix,
}


for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 2) {
            var eatgrass = new Eatgrass(x, y);
            eatArr.push(eatgrass);
        } else if (matrix[y][x] == 1) {
            var grass = new Grass(x, y);
            grassArr.push(grass);
        }
        else if (matrix[y][x] == 3) {
            var gis = new Gishatich(x, y);
            gisArr.push(gis);
        }
        else if (matrix[y][x] == 4) {
            var lArr = new Lion(x, y);
            lionArr.push(lArr);
        }
        else if (matrix[y][x] == 5) {
            var vorsord = new Vorsord(x, y);
            vorArr.push(vorsord);
        }

    }
}
exanak = "amar"
takt = 0
weather = ["garun", "amar", "ashun", "dzmer"]
function game() {
    takt++
    if (takt <= 20) {
        exanak = weather[0];
    }
    else if (takt <= 40) {
        exanak = weather[1]
    }
    else if (takt <= 60) {
        exanak = weather[2]
    }
    else if (takt <= 80) {
        exanak = weather[3]
    }
    else {
        takt = 0;
    }
    for (var u in grassArr) {
        grassArr[u].mul();
    }


    for (var u in eatArr) {
        if (exanak == "amar") {
            eatArr[u].eat(4);
        }
        else if (exanak == "garun") {
            eatArr[u].eat(3);
        }
        else if (exanak == "dzmer") {
            eatArr[u].eat(1);
        }
        else if (exanak == "ashun") {
            eatArr[u].eat(2);
        }

    } for (var u in gisArr) {
        if (exanak == "amar") {
            gisArr[u].eat(20);
        }
        else if (exanak == "garun") {
            gisArr[u].eat(19);
        }
        else if (exanak == "dzmer") {
            gisArr[u].eat(17);
        }
        else if (exanak == "ashun") {
            gisArr[u].eat(18);
        }

    }
    for (var u in lionArr) {
        if (exanak == "amar") {
            lionArr[u].eat(20);
        }
        else if (exanak == "garun") {
            lionArr[u].eat(19);
        }
        else if (exanak == "dzmer") {
            lionArr[u].eat(17);
        }
        else if (exanak == "ashun") {
            lionArr[u].eat(18);
        }

    }
    for (var u in vorArr) {
        if (exanak == "amar") {
            vorArr[u].eat(8);
        }
        else if (exanak == "garun") {
            vorArr[u].eat(7);
        }
        else if (exanak == "dzmer") {
            vorArr[u].eat(5);
        }
        else if (exanak == "ashun") {
            vorArr[u].eat(6);
        }

    }

    io.sockets.emit("uxarkum em matrix", obj);
}







io.on('connection', function (socket) {
    socket.on("spanel ", function() {
        gisArr = [];
        eatArr = [];
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                matrix[y][x] = 0
            }
        }

    });
});

setInterval(game, 1000)
var statistic = {};
function a(){
    statistic.grArr = grassArr.length;
    statistic.eArr = eatArr.length;
    statistic.giArr = gisArr.length;
    statistic.liArr = lionArr.length;
    statistic.grArr = grassArr.length;
    statistic.vArr = vorArr.length;
    fs.writeFile("statistic.json", JSON.stringify(statistic));
}
setInterval(a,1000)
