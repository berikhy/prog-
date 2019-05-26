LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

   
    mul() {
        this.multiply++;
        if (this.multiply == 5) {

            
            var fundCords = this.chooseCell(0);
            var cord = fundCords[Math.floor(Math.random()*fundCords.length)]

            if (cord) {
                var x = cord[0];
                var y = cord[1];

               
                var norXot = new Grass(x, y, this.index);
                grassArr.push(norXot);

                
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }



}