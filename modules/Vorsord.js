LivingCreature = require('./LivingCreature')

module.exports = class Vorsord extends LivingCreature {
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
       
        var fundCords = this.chooseCell(4);
        var cord = fundCords[Math.floor(Math.random()*fundCords)]

        if (cord) {
            var x = cord[0];
            var y = cord[1];

           
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 2;
            var eatgrass = new Eatgrass(this.x, this.y);
            eatArr.push(eatgrass);
            
            this.x = x;
            this.y = y;

        }
    }


    
    eat(l) {
   
        var fundCords = this.chooseCell(1);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)]


      
        if (cord) {
            var x = cord[0];
            var y = cord[1];

           
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 2;
            var eatgrass = new Eatgrass(this.x, this.y);
            eatArr.push(eatgrass);
            
            this.x = x;
            this.y = y;

            
            this.multiply++;

           
            this.energy++;

            
            for (var i in lionArr) {
                if (x == lionArr[i].x && y == lionArr[i].y) {
                    lionArr.splice(i, 1);
                }
            }

            
            if (this.multiply == l) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            
            this.move();
            this.energy--;
            if (this.energy < 0) {
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

           
            var vor = new Vorsord(x, y, this.index);
            vorArr.push(vor);

           
            matrix[y][x] = 5;
            this.multiply = 0; 
        } 
    }

    
    die() {
        
        matrix[this.y][this.x] = 0;

       
        for (var i in vorArr) {
            if (this.x == vorArr[i].x && this.y == vorArr[i].y) {
                vorArr.splice(i, 1);
            }
        }
    }

}