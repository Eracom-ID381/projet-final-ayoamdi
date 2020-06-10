let target;
let projectiles = [];



function setup() {
    colorMode(HSB, 255);
    background(0, 0, 255);
    createCanvas(windowWidth, windowHeight);
    target = new Target(random(0, width), random(0, height), 300, true, random(255, 0));

    for (let i = 0; i < 1; i += 1) {
        projectiles[i] = new Projectile(width / 2, height / 2, 20, 20, 0, random(0, 255))
    }



}

function draw() {
    background(255, 0, 255)
    // for (let bgColor = 0; bgColor < 255; bgColor = bgColor + random(0, 255)) {
    //     fill(0, 0, bgColor);
    //     rect(0, 0, width, height);
    // }

    //target change de place
    let targetDistance = dist(mouseX, mouseY, target.x, target.y);
    if (targetDistance < target.size / 2) {
        target = new Target(random(0, width), random(0, height), random(20, 150), true, random(255, 0));
    }
    target.display();

    //curseur
    fill(255, 190, 255, 30);
    ellipse(mouseX, mouseY, 5, 5);

    //projectiles
    for (let i = 0; i < projectiles.length; i += 1) {
        projectiles[i].afficher();
        projectiles[i].bouger();
    }

    console.log();


}

class Target {
    constructor(_x, _y, _size, _isActive, _colorTarget) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.isActive = _isActive;
        this.colorTarget = _colorTarget;
    }

    display() {
        fill(this.colorTarget, 200, 255);
        ellipse(this.x, this.y, this.size);
    }
}

class Projectile {
    constructor(x, y, radius, vitesseX, vitesseY, colorProjectile) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colorProjectile = colorProjectile;

    }

    afficher() {
        fill(this.colorProjectile, 200, 255);
        for (this.x = 0; this.x < width; this.x = this.x + 50) {
            ellipse(this.x, this.y, this.radius, this.radius);
        }
    }

    bouger() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;

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