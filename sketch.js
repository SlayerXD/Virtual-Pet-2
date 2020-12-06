var dog, happydog
var database
var foodS, foodStock
var dogImg, happydogImg
var feed
var addFood
var fedTime, lastFed
var foodObj

function preload()
{
  dogImg = loadImage("images/dogImg.png")
  happydogImg = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 500);
  foodObj = new Food();
  database = firebase.database();
  feed = createButton("feed Pet")
  feed.position(525,95);
  feed.mousePressed(feed);

  addFood = createButton("Add Food");
  addFood.position(625,95);
  addFood.mousePressed(addFood);
  database = firebase.database()
  dog = createSprite(250,250);
  dog.scale = 0.20
  dog.addImage(dogImg);
  happydog = createSprite(250,250);
  happydog.addImage(happydogImg)
  happydog.scale = 0.20
  happydog.visible = false

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  
}


function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lasFed=data.val();
  })
  
  fill(255,255,254);
  textSize(15);
  if (lastFed>=12) {
    text("Last Feed :" + lastFed%12 + "PM, 350,30");
  } else if(lastFed==0) {
    text("Last Feed : 12 AM", 350,30);
  }else {
    text("Last Feed :" + lastFed + "AM", 350,30);
  }
  drawSprites();
}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function writeStock(x) {
  if (x <= 0) {
    x = 0
  }
else { 
  x = x - 1
  
}
 database.ref("/").update({
   Food: x
 })
}

function addFood() {
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}

 function feedDog() {
  dog.addImage(happyDogImg)
  foodObj.updatefoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food: foodObj.getfoodStock(),
    FeedTime:hour()
  })
  
}


