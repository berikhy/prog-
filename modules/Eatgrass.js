LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
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

           
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

           
            this.x = x;
            this.y = y;

        }
    }


   
    eat(k) {
        
        var fundCords = this.chooseCell(1);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)]

        
        if (cord) {
            var x = cord[0];
            var y = cord[1];

           
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            
            this.x = x;
            this.y = y;

            
            this.multiply++;

           
            this.energy++;

          
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }

            
            if (this.multiply == k) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            
            this.move();
            this.energy--;
            if (this.energy < 3) { 
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

            
            var eat = new Eatgrass(x, y, this.index);
            eatArr.push(eat);

         
            matrix[y][x] = 2;
           
        } 
    }

  
    die() {
        
        matrix[this.y][this.x] = 0;

      
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }

}