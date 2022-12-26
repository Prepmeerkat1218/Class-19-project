var play = 1;
var end = 0;
var gameState = play;

var score;
var gameOver, restart;

var carImg, car;
var AIcarsGroup, AIcar1, AIcar2, AIcar3, AIcar4, AIcar5;
var obstacle
var roadImg, road;

var gameOverImg, restartImg;




function preload(){
 carImg = loadImage("car.png");
 roadImg = loadImage("Road.png");

 AIcar1 = loadImage("AIcar1.png");
 AIcar2 = loadImage("AIcar2.png");
 AIcar3 = loadImage("AIcar3.png");
 AIcar4 = loadImage("AIcar4.png");
 AIcar5 = loadImage("AIcar5.png");

 restartImg = loadImage("restart.png");
 gameOverImg = loadImage("gameOver.png");
}

function setup() {
 createCanvas(600,600);

 AIcarsGroup = createGroup();
 
 road = createSprite(300,300);
 road.addImage("Road", roadImg);
 road.velocityY = 10;

 car = createSprite(300,450,50,50);
 car.addImage("car", carImg);
 car.scale = 0.3

 car.setCollider("rectangle",0,0,car.width,car.height);

 gameOver = createSprite(300,150);
 gameOver.addImage("gameOver",gameOverImg);

 restart = createSprite(300,300);
 restart.addImage("restart",restartImg);

 score = 0;

}

function draw() {
 background(0);
 text("Score: "+ score,500,50);

  if(gameState === play){
  
    gameOver.visible = false;
    restart.visible = false;

    if (road.y > 500){
        road.y = 300
    }

    score = score + Math.round(getFrameRate()/60);

    car.x = World.mouseX;

    spawnAICars();
  
    if(AIcarsGroup.isTouching(car)){
      gameState = end;
    }
  }
   else if(gameState === end){

    gameOver.visible = true;
    restart.visible = true;

    road.velocityY = 0;
    car.velocityX = 0;

    AIcarsGroup.setLifetimeEach(-1);
    AIcarsGroup.setVelocityYEach(0);
    if(mousePressedOver(restart)) { 
      reset();
   }
  }

  drawSprites();
}

function reset(){
  gameState = play;
  AIcarsGroup.destroyEach();
  score = 0;
  road.velocityY = 10;
}
  

function spawnAICars(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(Math.round(random(0,600)),50);
    obstacle.velocityY = +(6 + score/100);

    var rand = Math.round(random(1,5));
    switch(rand) {
       case 1: obstacle.addImage(AIcar1);
               break;
       case 2: obstacle.addImage(AIcar2);
               break;
       case 3: obstacle.addImage(AIcar3);
               break;
       case 4: obstacle.addImage(AIcar4);
               break;
       case 5: obstacle.addImage(AIcar5);
               break;
       default: break;
    }

    obstacle.scale = 1.2;
    obstacle.lifetime = 300;

    AIcarsGroup.add(obstacle);
  }
}
