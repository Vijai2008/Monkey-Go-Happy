
var monkey , monkey_running, monkeyStop;
var invisibleGround;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime=0;
var gameState="play";
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  monkeyStop=loadAnimation("sprite_0.png");
}



function setup() {
  createCanvas(600,400);

  monkey=createSprite(100,360,50,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",monkeyStop);
  monkey.scale=0.1;
  
  invisibleGround = createSprite(300,400,600,10);
  invisibleGround.visible = false;
  ground=createSprite(300,395,600,10);
  ground.shapeColor=("brown");
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
background(100,200,300);
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score,400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time : " + survivalTime,100,50);
  
    if(gameState==="play"){
      
      survivalTime=Math.ceil(frameCount/frameRate());

    if (frameCount % 120 === 0) {
      var banana = createSprite(600,380,40,10);
      banana.y = Math.round(random(200,250));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -5;
      banana.lifetime = 230;
      bananaGroup.add(banana);
    }
  
    if (frameCount % 300 === 0) {
      var obstacle = createSprite(600,372,40,10);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      obstacle.velocityX = -5;
      obstacle.lifetime = 230;
      obstacleGroup.add(obstacle);
    }
  
    if (survivalTime>10){
        bananaGroup.velocityX=-6
    }
    
    if (keyDown("space") && monkey.y >= 159){
      monkey.velocityY=-15;
    }
  
    if (monkey.isTouching(bananaGroup)){
      score=score+2
      bananaGroup.destroyEach();  
    }
  
    if (monkey.isTouching(obstacleGroup)){
      gameState="end";
    }
  
   monkey.velocityY=monkey.velocityY+1;
   }
   else if(gameState==="end"){
     monkey.velocityY=0; 
     bananaGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
     monkey.changeAnimation("stop",monkeyStop);
   }
   monkey.collide(invisibleGround);
  
  drawSprites();
}






