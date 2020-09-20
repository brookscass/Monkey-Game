var bananaImage,foodGroup, obstacleImage, obstacleGroup; 

var bground, backImage, ground;

var player, player_running;

var score = 0;

function preload(){
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png", "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  backImage = loadImage("jungle.jpg");  
}


function setup() {
  createCanvas(800,400);
  
  bground = createSprite(0,0,800,400);
  bground.addImage(backImage);
  bground.scale = 1.5;
  bground.x = bground.width/2;
  bground.velocityX = -4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  score=0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background(255);
   
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(bground.x<100){
    bground.x=bground.width/2;
  }
  
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score+1;  
  }
   switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
  if(keyDown("space") && player.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY =  player.velocityY + 0.8
  
  if(obstacleGroup.isTouching(player)){ 
        player.scale=0.08;
   
    }
  
   spawnObstacles();
   spawnFood();
   player.collide(ground);
  
drawSprites();
  stroke("white");
  textSize(20);
  fill("yellow");
  text("Score:"+ score, 500,50);
}

function spawnFood(){
  if(frameCount % 80 === 0) {
    var banana = createSprite(600,230,10,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    banana.lifetime = 300;
    foodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
  
    obstacleGroup.add(obstacle);
  }
}



