 var PLAY = 1;
var END = 0;
var gameState = PLAY
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var score;
var ground;
var edges;
var score;
var survivaltime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
  // creating monkey
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;

  edges = createEdgeSprites();
   
  ground = createSprite(300,180,1200,5);
  ground.x=ground.width/2;
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  
  
  score=0;
}


function draw() {
  background("white");
  //console.log(monkey.y)
  monkey.collide(ground);
  
  if(gameState === PLAY){
     ground.velocityX = -4;
  if(ground.x<0){
   ground.x=ground.width/2
  }
     
  if(keyDown("space") && monkey.y>=141){
     monkey.velocityY = -10;
     }
monkey.velocityY = monkey.velocityY + 0.5;
    
    Food();
  spawnobstacle();
    if (obstaclesGroup.isTouching(monkey)){
      gameState= END
    }
  }
   else if (gameState === END){
     ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     
     bananaGroup.setVelocityXEach(0);
     bananaGroup.setLifetimeEach(-1);
   }
 
  
 
  
 textSize(20);
  fill("black");
  text("Score:"+score,500,30);
  
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivaltime,300,30);
  
  
  
  drawSprites();
}

function Food() {
  if (frameCount%80===0) {
    banana = createSprite(600,50,20,20);
    banana.velocityX=-3;
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.Y= Math.round(random(10,100));
    banana.lifetime=220;
    banana.depth= monkey.depth;
    monkey.depth=monkey.depth+1;
    bananaGroup.add(banana);
    
  }
}

function spawnobstacle(){
  if (frameCount%150===0) {
    obstacle = createSprite(600,160,20,20);
    obstacle.velocityX=-4;
   obstacle.addImage(obstacleImage);
    obstacle.scale=0.1
    obstacle.lifetime=160;
    obstaclesGroup.add(obstacle);
  }
}



