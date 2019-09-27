class Demineur {
    

    constructor(X,Y,mineAgenerer) {
        //------Variable du jeu
        this.nbMine = 0;
        this.nbCase = 0;
        this.nbCasedecouverte = 0;
        this.nbMineAgenerer = mineAgenerer;
        this.tailleX=X-1;
        this.tailleY=Y-1;
        this.jouer=true;
        //-------
        var grille = [];
        for(let i=0;i<=this.tailleY;i++){
            grille.push([]);
            for( let j=0;j<=this.tailleX;j++) {
                grille[i].push(0);
            }
        }
        while (this.nbMineAgenerer!==0) {
            var positionY=Math.round(Math.random()*this.tailleY);
            var positionX=Math.round(Math.random()*this.tailleX);
            for(let y=0;y<=this.tailleY;y++) {
                if (y === positionY) {
                for (let x = 0; x <= this.tailleX; x++) {
                        if (x === positionX) {
                            if (grille[y][x] !== 'M') {
                            grille[y][x] = 'M';
                            this.nbMineAgenerer = this.nbMineAgenerer - 1;
                            if ((x >= 0 && x <= this.tailleX) && (y + 1 >= 0 && y + 1 <= this.tailleY) && grille[y + 1][x] !== 'M') {
                                grille[y + 1][x] = grille[y + 1][x] + 1;
                            }
                            if ((x + 1 >= 0 && x + 1 <= this.tailleX) && (y + 1 >= 0 && y + 1 <= this.tailleY) && grille[y + 1][x + 1] !== 'M') {
                                grille[y + 1][x + 1] = grille[y + 1][x + 1] + 1;
                            }
                            if ((x + 1 >= 0 && x + 1 <= this.tailleX) && (y >= 0 && y <= this.tailleY) && grille[y][x + 1] !== 'M') {
                                grille[y][x + 1] = grille[y][x + 1] + 1;
                            }
                            if ((x + 1 >= 0 && x + 1 <= this.tailleX) && (y - 1 >= 0 && y - 1 <= this.tailleY) && grille[y - 1][x + 1] !== 'M') {
                                grille[y - 1][x + 1] = grille[y - 1][x + 1] + 1;
                            }
                            if ((x >= 0 && x <= this.tailleX) && (y - 1 >= 0 && y - 1 <= this.tailleY) && grille[y - 1][x] !== 'M') {
                                grille[y - 1][x] = grille[y - 1][x] + 1;
                            }
                            if ((x - 1 >= 0 && x - 1 <= this.tailleX) && (y - 1 >= 0 && y - 1 <= this.tailleY) && grille[y - 1][x - 1] !== 'M') {
                                grille[y - 1][x - 1] = grille[y - 1][x - 1] + 1;
                            }
                            if ((x - 1 >= 0 && x - 1 <= this.tailleX) && (y >= 0 && y <= this.tailleY) && grille[y][x - 1] !== 'M') {
                                grille[y][x - 1] = grille[y][x - 1] + 1;
                            }
                            if ((x - 1 >= 0 && x - 1 <= this.tailleX) && (y + 1 >= 0 && y + 1 <= this.tailleY) && grille[y + 1][x - 1] !== 'M') {
                                grille[y + 1][x - 1] = grille[y + 1][x - 1] + 1;
                            }

                        }
                    }
                }
            }
            }
        }
        console.log(grille);
                this.grid = grille.map((line) => {
            return line.map((elem) => {
                if (elem === 'M') {
                    this.nbMine=this.nbMine+1;
                    return new Mine();
                } else {
                    this.nbCase=this.nbCase+1;
                    return new Nombre(elem);
                }

            })

        });
    }

    display() {

        this.grid.forEach(function (line) {
            var tout = line.reduce(function (res, elem) {
                return res + elem.display();
            }, "|");
            console.log(tout);
        });
    }

    flag(x, y) {
        if ((x >= 0 && x <= this.tailleX) && (y >= 0 && y <= this.tailleY)) {
            this.grid[y][x].flag = true;
            this.nbMine = this.nbMine - 1;
            this.display();
            if (this.nbMine === 0) {
                this.jouer = false;
            }
        }
    }
    unflag(x, y) {
        if ((x >= 0 && x <= this.tailleX) && (y >= 0 && y <= this.tailleY)) {
            if (this.grid[y][x].flag === true) {
                this.grid[y][x].flag = false;
                this.nbMine = this.nbMine + 1;
                this.display();
            }
        }
    }
    voirtout(){
        for(let y=0;y<=this.tailleY;y++){
            for(let x=0;x<=this.tailleX;x++){
                this.grid[y][x].cache=false;

            }
        }
    }
    click(x, y) {
        if((x>=0 && x<=this.tailleX)&&(y>=0 && y<=this.tailleY)){
            if (this.grid[y][x] instanceof Mine) {
                this.jouer=false;
                console.clear();
                this.voirtout();
                console.log("Perdu");
                this.display();
            }
            else {
                if (this.grid[y][x].flag === false ){
                    if (this.grid[y][x].cache === true) {
                        this.grid[y][x].cache = false;
                        this.nbCasedecouverte=this.nbCasedecouverte+1;
                        if (this.grid[y][x].nombre === 0) {
                                this.unflag(x, y + 1);
                                this.click(x, y + 1);
                                this.unflag(x + 1, y + 1);
                                this.click(x + 1, y + 1);
                                this.unflag(x + 1, y);
                                this.click(x + 1, y);
                                this.unflag(x + 1, y - 1);
                                this.click(x + 1, y - 1);
                                this.unflag(x, y - 1);
                                this.click(x, y - 1);
                                this.unflag(x - 1, y - 1);
                                this.click(x - 1, y - 1);
                                this.unflag(x - 1, y);
                                this.click(x - 1, y);
                                this.unflag(x - 1, y + 1);
                                this.click(x - 1, y + 1);
                        }
                    }
                }
            }
            if(demineur.nbCasedecouverte===demineur.nbCase){
                this.jouer=false;
                console.clear();
                demineur.voirtout();
                console.log("Gagner!");
                this.display();
            }
        }
    }

}
class Cellule{
    constructor(){
        this.cache=true;
        this.flag=false;
    }
}
class Mine extends Cellule{
    constructor(){
        super();
    }
    display(){
        if(this.cache===true){
            if(this.flag===true){
                return '? |';
            }
            else{
                return'■ |';
            }
        }
        else {
            return 'M |';
        }
    }
}
class Nombre extends Cellule{
    constructor(number){
        super();
        this.nombre=number;
}
    display(){
        if(this.cache===true){
            if(this.flag===true){
                return '? |';
            }
            else{
                return'■ |';
            }
        }
        else {
            if(this.nombre!==0) {
                return this.nombre + ' |';
            }
            else{
                return '  |';
            }
        }
    }

}
var scanf = require('scanf');
console.clear();
console.log("Taille de la grile:");
console.log("x:");
let X=scanf('%d');
console.log("y:");
let Y=scanf('%d');
console.log("Nombre de mine:");
let mineAgenerer=scanf('%d');
var demineur= new Demineur(X,Y,mineAgenerer);
console.log(demineur.grid);
while(demineur.jouer===true){
    console.clear();
    demineur.display();
    console.log("pour cliquer tapez 1 pour flag tapez 2 pour unflag tapez 3");
    let N=scanf('%d');
    console.log("choisissez la coordonnée x");
    let X=scanf('%d');
    console.log("choisissez la coordonnée y");
    let Y=scanf('%d');
    if (N===1){

        demineur.click(X,Y);
    }

else if(N===2){
        demineur.flag(X,Y);
    }
    else if(N===3){
        demineur.unflag(X,Y);
    }


}/*
var scanf = require('scanf');

    console.clear();
    console.log(demineur.nbMine);
    demineur.flag(2,2);
    console.log("");
    demineur.click(2,0);
    console.log("");
    demineur.click(1,0);
    demineur.display();
    console.log("");
    console.log(demineur.nbMine);
    demineur.unflag(2,2);
    if(demineur.nbCasedecouverte===demineur.nbCase){
        demineur.voirtout();
        demineur.display();
        console.log("gagner")
    }
    console.log(demineur.nbMine);*/
