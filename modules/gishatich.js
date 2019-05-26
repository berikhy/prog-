
LivingCreature = require('./LivingCreature')
module.exports = class Gishatich extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
        }
    move() {
       
        var fundCords = this.chooseCell(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords)]

        if (cord) {
            var x = cord[0];
            var y = cord[1];

           
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

           
            this.x = x;
            this.y = y;

        }
    }


   
    eat(a) {
       
        var fundCords = this.chooseCell(2);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)]


        
        if (cord) {
            var x = cord[0];
            var y = cord[1];

          
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

           
            this.x = x;
            this.y = y;

           
            this.multiply++;

            this.energy++;

            
            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }

            
            if (this.multiply == a) {
                this.mul()
                this.multiply = 0;
            }


        } else {
          
            this.move();
            this.energy--;
            if (this.energy < 2) { 
                this.die();
            }
        }
    }

    
    mul() {
        
        var fundCords = this.chooseCell(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords)]

        
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            
            var gis = new Gishatich(x, y, this.index);
            gisArr.push(gis);

            
            matrix[y][x] = 3;
            this.multiply = 0;
        } 
    }

    
    die() {
        
        matrix[this.y][this.x] = 0;

       
        for (var i in gisArr) {
            if (this.x == gisArr[i].x && this.y == gisArr[i].y) {
                gisArr.splice(i, 1);
            }
        }
    }

}