let side = 25
let socket = io()

function setup() {
    frameRate(5);
    createCanvas(50*side,50*side); 
    background('#acacac');

    
}

 


socket.on("uxarkum em matrix",drawMatrix);
function drawMatrix(obj) {
matrix = obj.matrix
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill('#f00606');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill('blue');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill('rgb(107, 53, 22)');
                rect(j * side, i * side, side, side);
            }
        }

    }


    
   
  
}
function kill(){
    socket.emit ("spanel")
}
