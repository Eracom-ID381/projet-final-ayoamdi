let projectiles = [];
let projectileHaut;
let projectileBas;
let projectileGauche;
let projectileDroite;
let level = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    //background(0, 0, 0);
    //projectileHaut = new Projectile();
    // projectileBas = new Projectile();
    // projectileGauche = new Projectile();
    // projectileDroite = new Projectile();
    projectiles.push(projectileHaut);
    projectiles.push(projectileBas);
    projectiles.push(projectileGauche);
    projectiles.push(projectileDroite);

}

function draw() {

    //curseur
    fill(255, 204, 0, 30);
    ellipse(mouseX, mouseY, 10, 10);
    //point rouge
    noStroke();
    fill(255, 17, 5, 20);
    ellipse(width / 2 + 650, height / 2 + 350, 50, 50);
    //point vert
    fill(155, 255, 5, 20);
    ellipse(width / 2 - 650, height / 2 - 350, 50, 50);

}

class Projectile {
    constructor(x, y, radius, r, v, b, vitesseX, vitesseY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r = r;
        this.v = v;
        this.b = b;
    }

    afficher() {
        fill(r, v, b);
        for (this.x = 0; this.x < width; this.x = x + 50) {
            ellipse(this.x, this.y, this.radius, this.radius);
        }
    }

    bouger() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;

    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}