//Create variables here
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var dog, happyDog, database, foodS, foodStock, dogImage, dogHappy;
var foodObj, fedTime, lastFed, feed, addFood;

function preload()
{
  //load images here
  
  dogImage = loadImage("dog.png");
  dogHappy = loadImage("happydog.png");

}

function setup() {
  createCanvas(800, 700);
  
  var dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImage);
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function draw() { 
  background(46, 139, 87);
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : " + lastFed % 12 + "PM", 250, 30);
  }
  else if(lastFed == 0){
    text("Last Fed : 12 AM", 350, 30);
  }
  else{
    text("Last Fed : " + lastFed + "AM", 350, 30);
  }

  drawSprites();

  textSize(20);
  fill("green");
  stroke("black");
  text(" Note : Press UP_ARROW Key To Feed Drago Milk! ");  

  //add styles here

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  database.ref('/').update({
    Food : x
  })
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}