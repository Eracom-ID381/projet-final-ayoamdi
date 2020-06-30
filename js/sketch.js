let target;
let projectiles = [];
let level = 1;
let score = 0;
let gameOver = false;
let _gameOver;
let button;
// 0: Game on
// 1: Game over. On entre dans ce mode quand un projectile entre en collision avec le curseur.
//    Un écran apparait, nous permettant de revenir au mode 0.

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

  button = createButton("Restart");
  button.position(width / 2, height / 2);
  button.mousePressed(restartGame);
  button.addClass("hidden");

  _gameOver = gameOver;
}

function draw() {
  background(0, 0, 0);
  noStroke();
  //curseur
  fill(0, 0, 255);
  ellipse(mouseX, mouseY, 5, 5);

  fill(255, 255, 0);
  textSize(50);
  text(score, width / 2, 100);

  if (!gameOver) {
    let targetDistance = dist(mouseX, mouseY, target.x, target.y);

    if (targetDistance < target.size / 2) {
      target = new Target(
        random(0, width),
        random(0, height),
        random(20, 150),
        true,
        random(255, 0)
      );
      level = level + 1;
      generateProjectiles();
      score = +1;
    }

    target.display();

    //projectiles
    for (let i = 0; i < projectiles.length; i++) {
      projectiles[i].rebond();
      projectiles[i].bouger();
      projectiles[i].afficher();
      let distance = dist(projectiles[i].x, projectiles[i].y, mouseX, mouseY);
      // console.log(distance);
      if (distance < 10) {
        gameOver = true;
        if (_gameOver != gameOver) {
          gameOverScreen();
          _gameOver = gameOver;
        }
      }
    }
  }
}

function gameOverScreen() {
  button.removeClass("hidden");
}

function restartGame() {
  button.addClass("hidden");
  gameOver = false;
  _gameOver = gameOver;
  projectiles = [];
  level = 1;
  generateProjectiles();
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
      random(0, 255),
      i,
      projectiles
    );
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
  constructor(_x, _y, _radius, _vitesseX, _vitesseY, _color, _id, _others) {
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
    this.vitesseX = _vitesseX;
    this.vitesseY = _vitesseY;
    this.color = _color;
    this.id = _id;
    this.others = _others;
  }

  rebond() {
    for (let i = this.id + 1; i < projectiles.length; i++) {
      // console.log(this.others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].radius + this.radius;
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * 0.05;
        let ay = (targetY - this.others[i].y) * 0.05;
        this.vitesseX -= ax;
        this.vitesseY -= ay;
        this.others[i].vitesseX += ax;
        this.others[i].vitesseY += ay;
      }
    }
  }

  afficher() {
    fill(this.color, 200, 255);
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  bouger() {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
  }
}
