let target;

function setup() {
    createCanvas(windowWidth, windowHeight);
    target = new Target(random(0, width), random(0, height), 300, true);
    
}

function draw() {
    background(255);
    let targetDistance = dist(mouseX, mouseY, target.x, target.y);
    if (targetDistance < target.size / 2) { 
        target = new Target(random(0, width), random(0, height), random(20, 150), true);
    }
    console.log(targetDistance);
    target.display();
}

class Target {
    constructor(_x, _y, _size, _isActive) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.isActive = _isActive;
    }

    display() {
        ellipse(this.x, this.y, this.size);
    }
}

// let projectiles = [];
// let projectileHaut;
// let projectileBas;
// let projectileGauche;
// let projectileDroite;
// let level = 0;

// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     //background(0, 0, 0);
//     //projectileHaut = new Projectile();
//     // projectileBas = new Projectile();
//     // projectileGauche = new Projectile();
//     // projectileDroite = new Projectile();
//     projectiles.push(projectileHaut);
//     projectiles.push(projectileBas);
//     projectiles.push(projectileGauche);
//     projectiles.push(projectileDroite);

// }

// function draw() {

//     //curseur
//     fill(255, 204, 0, 30);
//     ellipse(mouseX, mouseY, 10, 10);
//     //point rouge
//     noStroke();
//     fill(255, 17, 5, 20);
//     ellipse(width / 2 + 650, height / 2 + 350, 50, 50);
//     //point vert
//     fill(155, 255, 5, 20);
//     ellipse(width / 2 - 650, height / 2 - 350, 50, 50);

// }

// class Projectile {
//     constructor(x, y, radius, r, v, b, vitesseX, vitesseY) {
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.r = r;
//         this.v = v;
//         this.b = b;
//     }

//     afficher() {
//         fill(r, v, b);
//         for (this.x = 0; this.x < width; this.x = x + 50) {
//             ellipse(this.x, this.y, this.radius, this.radius);
//         }
//     }

//     bouger() {
//         this.x += this.vitesseX;
//         this.y += this.vitesseY;

//     }

// }

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }