var bananaImage, obstacleImage, ObstaclesGroup, bg, score;

var FoodGroup;

var ground;

var monkey;

function preload(){
  bananaImage = loadImage("banana.png");
  
  backdrop = loadImage("jungle.png");
  
  obstacle = loadImage("stone.png");
  
  player_running =     loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(200, 200, 400, 400);
  
  bg.addImage(backdrop);
  bg.x = bg.width/2;
  bg.velocityX = -4;
  bg.scale = 2;
  
  ground = createSprite(200, 370, 400, 20);
  ground.visible = false;
  
  monkey = createSprite(50, 330, 40, 50);
  monkey.addAnimation("running", player_running);
  monkey.scale = 0.1;

  score = 0;
  
  FoodGroup =  new Group();
  ObstaclesGroup = new Group() ;
}

function draw() {
  background(220);
  
  score= score+Math.round(getFrameRate()/60);
  text("Survival Time: " + score,300, 50);  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score= score+2
  }
  
  if(ObstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.1;
  }
  
  switch(score){
      case 10: monkey.scale = 1.12;
        break;
      case 20: monkey.scale = 1.14;
        break;
      case 30: monkey.scale = 1.16;
        break;
      case 40: monkey.scale = 1.18;
        break;
      case 50: monkey.scale = 1.2;
        break;
      default: break;
  }
  
  if(keyDown("space") & monkey.y > 365){
    monkey.velocityY = -12;
  }
  
  if(bg.x < 0){
    bg.x = bg.width/2;
  }
  
  food();
  obstacles();
  
  drawSprites();
}

function food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(400, 200, 30, 30);
    banana.scale = 0.1;
    banana.y = Math.round(random(200, 270));
    banana.velocityX = -4;
    banana.lifetime = 100;
    
    banana.addImage(bananaImage);
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
    var stone = createSprite(400, 340, 40, 40);
    stone.scale = 0.2;
    stone.velocityX = -4;
    stone.addImage(obstacle);
    
    stone.lifetime = 100;
    
    ObstacleGroup.add(stone);
  }
}