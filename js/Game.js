class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(10 ,200);
    runner1.addAnimation("boy", runners);

    runner2 = createSprite(10, 500);
    runner2.addAnimation("boy2",runners);

    // runner3 = createSprite(500,200);
    // runner3.addImage("car3",car3_img);
    // runner4 = createSprite(700,200);
    // runner4.addImage("car4",car4_img);
    contestants = [runner1, runner2];

    invisibleGround = createSprite(100, 280, windowWidth * 5, 20);
    invisibleGround.visible = true;

    invisibleGround2 = createSprite(100, 550, windowWidth * 5, 20);
    invisibleGround2.visible = true;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    spawnObstacles();
    spawnObstacles2();

    if(allPlayers !== undefined){

      background(rgb(198,135,103));
      image(trackImg, -100, -20, displayWidth * 5, displayHeight);

      //var display_position = 100;

      //index of the array
      var index = 0;


      //x and y position of the cars
      var x = 50;
      var y = 140;


      runner1.collide(invisibleGround);
      runner2.collide(invisibleGround2);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 200;

        //use data form the database to display the cars in y direction
        x = 200 - allPlayers[plr].distance;
        contestants[index-1].x = x;
       // contestants[index-1].y = y;

        // contestants[index-1].velocityX = -2;
        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          fill("red");
          stroke(10);
          ellipse(x,y,60,60);
          text(player.name ,x-10,y + 60);
          text(player.distance,x-10 ,y + 70);
          camera.position.x = contestants[index-1].x;
         // camera.position.y = contestants[index-1].y;

          player.x = x;
          // player.y = y;

          if(keyDown("space")){
            if(contestants[index - 1].y > 500 && player.index === 2){
              contestants[index-1].velocityY = -4;
              console.log("Space pressed");
            }
            if(contestants[index - 1].y > 250 && player.index === 1){
              contestants[index - 1].velocityY = -4;
              console.log("Working!");
            }
            }

          contestants[index - 1].velocityY = contestants[index - 1].velocityY + 1;
         }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance -= 10;
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank = player.rank + 1;
      player.updatePlayersAtEnd(player.rank);
    }

    drawSprites();
  }


  end(){
    background(255, 0, 0);
    text("Game over! Your rank is" + " " + player.rank + "!", displayWidth/2, displayHeight/2);
  }
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    var hurdles = createSprite(player.x + 1800, 250);
    hurdles.velocityX = -2;
    hurdles.lifetime = windowWidth / 2;
    hurdles.addImage("Obstacles", hurdle);
    hurdles.scale = 0.8;
  }
}

function spawnObstacles2(){
  if(frameCount % 200 === 0){
    var hurdles = createSprite(player.x + 1800, 520);
    hurdles.velocityX = -2;
    hurdles.lifetime = windowWidth / 2;
    hurdles.addImage("Obstacle2", hurdle);
    hurdles.scale = 0.8;
  }
}
