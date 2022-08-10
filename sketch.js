var sky, harry, harryFly, skyImg;
var snitch, snitchFly;
var balls1, balls2, ball1img, ball2img;
var dementors, dementorimg;
var kissedHarryimg;
var twall, bwall, rwall, lwall;
var titleimg, endingimg;
var die, winner;
var title, end;
var gameState = "start"; 
var keysActive = true;
var flag =1; 
var playOnce=true;
var score=0;

function preload(){
  harryFly = loadAnimation("assets/H1.png","assets/H2.png","assets/H3.png", "assets/H4.png", "assets/H5.png", "assets/H6.png");
  skyImg = loadImage("assets/sky-2.jpg");
  snitchFly = loadAnimation("assets/s1.png", "assets/s2.png", "assets/s3.png", "assets/s4.png", "assets/s5.png", "assets/s6.png", "assets/s7.png", "assets/s8.png");
  ball1img = loadImage("assets/ball1.png");
  ball2img = loadImage("assets/ball2.png");
  dementorimg = loadAnimation("assets/d1.png", "assets/d2.png", "assets/d3.png", "assets/d4.png", "assets/d5.png", "assets/d6.png","assets/d7.png", "assets/d8.png","assets/d9.png","assets/d10.png", "assets/d11.png", "assets/d12.png", "assets/d13.png", "assets/d14.png", "assets/d15.png","assets/d16.png","assets/d17.png","assets/d18.png","assets/d19.png","assets/d20.png","assets/d21.png","assets/d22.png","assets/d23.png","assets/d24.png","assets/d25.png","assets/d26.png","assets/d27.png");
  kissedHarryimg = loadAnimation("assets/kissedHarry.png");
  titleimg = loadImage("assets/title.png");
  endingimg = loadImage("assets/win.png");
  die = loadSound("assets/death.mp3");
  winner = loadSound("assets/winner.mp3");
}

function setup(){
  createCanvas(1600,750);
  title = createSprite(800, 375);
  title.addImage(titleimg);
  title.scale = 1.06;
  sky = createSprite(800, 375, 1600, 750);
  sky.addImage(skyImg);
  sky.velocityX = -8;
  sky.visible = false;
  harry = createSprite(150,160);
  harry.addAnimation("flying", harryFly);
  harry.addAnimation("dead", kissedHarryimg);
  harry.scale = 0.4;
  harry.visible = false;
  snitch = createSprite(380,160);
  snitch.addAnimation("fly", snitchFly);
  snitch.scale = 0.1;
  snitch.visible = false;
  twall = createSprite(800, 10, 1600, 10);
  bwall = createSprite(800, 740, 1600, 10);
  rwall = createSprite(1590, 375, 10, 750);
  lwall = createSprite(10, 375, 10, 750);
  twall.visible = false;
  bwall.visible = false;
  rwall.visible = false;
  lwall.visible = false;
  balls1 = new Group();
  balls2 = new Group();
  dementors = new Group();
  end = createSprite(800, 375);
  end.addImage(endingimg);
  end.visible = false; 
}


function draw(){
  
  background(120);

  if(gameState==="start")
  {
    
    drawSprites();
    textSize(30);
    fill("yellow")
    text("Welcome to the Qudditch World Cup!", 550, 100);
    textSize(20);
    fill("white");
    text("Press space key to start playing!", 650, 200);
    if(keyDown("space"))
    {
      gameState = "play";
      console.log("hi");
      snitch.visible = true;
    }
    
  }
  if(gameState==="play")
  {
    title.destroy();
    if(flag==1)
    {
      snitch.velocityX = 26;
      snitch.velocityY = 24;
      flag=0;
    }
  sky.visible = true;
  harry.visible = true;
  if(sky.x<-300)
  {
    sky.x = width/2;
  }
  if(keysActive)
  {
    if(keyDown(UP_ARROW))
  {
    harry.y = harry.y-5;
  }

  if(keyDown(DOWN_ARROW))
  {
    harry.y = harry.y+5;
  }
  }
  

  snitch.bounceOff(twall);
  snitch.bounceOff(bwall);
  snitch.bounceOff(rwall);
  snitch.bounceOff(lwall);
  var r = Math.round(random(1,2));
  if(r==1)
  {
    spawnBall1();
  }
  if(r==2)
  {
    spawnBall2();
  }
  for(var i = 0; i<balls1.length; i++)
  {
    if(balls1.get(i).isTouching(harry))
   {
    balls1.get(i).destroy();
    score = score+3;
   }
  }
  for(var i = 0; i<balls2.length; i++)
  {
    if(balls2.get(i).isTouching(harry))
    {
      balls2.get(i).destroy();
      score = score+5;
    }
  }
  
  
  spawnDementors();
  if(dementors.isTouching(harry))
  {
    harry.changeAnimation("dead");
    harry.velocityY = 2
    dementors.setVelocityEach(0);
    balls1.setVelocityEach(0);
    balls2.setVelocityEach(0);
    snitch.velocityX = 0;
    snitch.velocityY = 0; 
    dementors.destroyEach();
    balls1.destroyEach();
    balls2.destroyEach();
    keysActive = false;
    die.play(); 
    gameState = "lose";
  }
 if(snitch.isTouching(harry))
 {
   score += 150;
   gameState = "end";
 }
  drawSprites();
  fill("black");
  textSize(20);
  text("Score: " + score, 1300, 50);
 }
 if(gameState==="end")
 {
   end.visible = true;
   harry.destroy();
   sky.destroy();
   snitch.destroy();
   dementors.destroyEach();
   balls1.destroyEach();
   balls2.destroyEach();
   drawSprites();
   textSize(30);
   fill("black");
   text("We won the world cup! Yay!", 600, 50)
   text("Your Score is " + score, 600, 80);
   if(playOnce)
   {
    winner.play();
    playOnce = false; 
   }
   
 }
 if(gameState==="lose")
 {
  drawSprites();
  textSize(30);
  fill("black");
  text("You lost the world cup, you brought shame to your house!", 600, 50);
 }
}

function spawnBall1()
{
  if(frameCount%100==0)
  {
    var ball = createSprite(1600, Math.round(random(50, 700)));
    
    
    
      ball.addImage(ball1img);
      ball.scale = 0.2
      ball.velocityX = -8;
      ball.lifeTime = 200;
    
    

    

    balls1.add(ball);
  }
}

function spawnBall2()
{
   if(frameCount%100==0)
    {
      var ball = createSprite(1600, Math.round(random(50, 700)));
      ball.addImage(ball2img);
      ball.scale = 0.1
      ball.velocityX = -7;
      ball.lifeTime = 200;
     
      balls2.add(ball);
    }
}

function spawnDementors()
{
  if(frameCount%200==0)
  {
    var dementor = createSprite(1600, Math.round(random(50, 700)));
    dementor.addAnimation("dflying", dementorimg);
    dementor.scale = 0.5;
    dementor.velocityX = -9;
    dementor.lifeTime = 200;
    dementors.add(dementor);

  }
}