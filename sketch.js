
var Play = 1;
var End = 0;
var gameState = Play;
var monkey , monkey_running,monkey__;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,survivalTime;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey__ = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(50,320,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collide",monkey__);
  monkey.scale = 0.11;
  
  ground = createSprite(200,380,800,70);
  ground.velocityX = -4;
  ground.shapeColor = "green";
  ground.x = ground.width /2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();

  survivalTime = 0;
  score = 0;

}

function draw() {
  background("skyblue");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,150,60);

  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime,120,40);
  
  if(gameState === Play){
    
    survivalTime = Math.ceil(frameCount/frameRate());

    if(keyDown("space")){
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (FoodGroup.isTouching(monkey)){
      score = score + 1;
      FoodGroup.destroyEach();
    }
        
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    monkey.collide(ground);
    food();
    obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = End;
    }
  }
  else if(gameState === End){

    monkey.y = 310;
    monkey.changeAnimation("collide",monkey__);
    
    ground.velocityX = 0;
    
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    stroke("black");
    fill("red");
    textSize(45);
    text("Game Over",90,200);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
  }

  drawSprites();
}

function food(){
  if (frameCount % 80 === 0){
    banana = createSprite(400,200,30,30);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -8;
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.lifetime = 100;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount % 300 === 0){
     stone = createSprite(400,305,20,20);
     stone.addImage(obstacleImage);
     stone.scale = 0.2;
     stone.velocityX = -10;
     stone.lifetime = 100;
    
     obstacleGroup.add(stone);
  }
}
