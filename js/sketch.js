let target;
let projectiles = [];
let level = 2;

function setup() {
  colorMode(HSB, 255);
  background(0, 0, 255);
  createCanvas(windowWidth, windowHeight);
  target = new Target(
    random(0, width),
    random(0, height),
    300,
    true,
    random(255, 0)
  );
  generateProjectiles();
}

function draw() {
  background(255, 0, 255);
  // for (let bgColor = 0; bgColor < 255; bgColor = bgColor + random(0, 255)) {
  //     fill(0, 0, bgColor);
  //     rect(0, 0, width, height);
  // }

  //target change de place
  let targetDistance = dist(mouseX, mouseY, target.x, target.y);

  if (targetDistance < target.size / 2) {
    target = new Target(
      random(0, width),
      random(0, height),
      random(20, 150),
      true,
      random(255, 0)
    );

    level = level + 10;

    generateProjectiles();
  }

  target.display();

  //curseur
  fill(255, 190, 255, 30);
  ellipse(mouseX, mouseY, 5, 5);

  //projectiles

  for (let i = 0; i < projectiles.length; i += 1) {
    projectiles[i].afficher();
    projectiles[i].bouger();
    for (let j = 0; j < projectiles.length; j += 1) {
      //check l'intersection entre les projectiles
      if (i != j && projectiles[i].intersection(projectiles[j])) {
        projectiles[i].rebond();
        projectiles[j].rebond();
      }
    }
  }
}

function generateProjectiles() {
  for (let i = 0; i < level; i += 1) {
    // 0 = Haut;
    // 1 = Gauche
    // 2 = Bas
    // 3 = Droite
    let r = int(random(0, 4));

    let startX;
    let startY;
    let startSpeedX = random(3, 8);
    let startSpeedY = random(3, 8);
    let projectileRadius = random(10, 30);

    if (r == 0) {
      startX = random(0, width);
      startY = -projectileRadius;
    } else if (r == 1) {
      startX = -projectileRadius;
      startY = random(0, height);
    } else if (r == 2) {
      startX = random(0, width);
      startY = height + projectileRadius;
      startSpeedY = -startSpeedY;
    } else if (r == 3) {
      startX = width + projectileRadius;
      startY = random(0, height);
      startSpeedX = -startSpeedX;
    }
    projectiles[i] = new Projectile(
      startX,
      startY,
      projectileRadius,
      startSpeedX,
      startSpeedY,
      random(0, 255)
    );

    // let di = dist(projectiles[].x, projectiles[].y, projectiles[].x, projectiles[].y, );
    //
    // if (di > Projectile.radius / 2) {
    //     projectiles.afficher
    // }
  }
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
  constructor(_x, _y, _radius, _vitesseX, _vitesseY, _colorProjectile) {
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
    this.vitesseX = _vitesseX;
    this.vitesseY = _vitesseY;
    this.colorProjectile = _colorProjectile;
  }

  rebond() {
    //this.colorProjectile = 0;
    this.vitesseX = -this.vitesseX;
    this.vitesseY = -this.vitesseY;
  }

  intersection(other) {
    let d = dist(this.x, this.y, other.x, other.y);

    if (d < this.radius + other.radius) {
      return true;
    } else if (d > this.radius + other.radius) {
      return false;
    }
  }

  afficher() {
    fill(this.colorProjectile, 200, 255);
    ellipse(this.x, this.y, this.radius, this.radius);
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
