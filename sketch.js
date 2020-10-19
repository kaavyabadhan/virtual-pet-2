//Create variables here
var dog,happydDog,database,foodStock,foodS;

function preload(){
  //load images here
  dogimg = loadImage("mac.png");
  dogimg2 = loadImage("mac2.png");
}

function setup() {
  var canvas = createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref('food');

  foodStock.on("value",readStock);
  dog = createSprite(250,300,10,10);
  dog.addImage(dogimg2);
  dog.scale=0.6

  happy = createSprite(250,300,10,10);
  happy.addImage(dogimg)
  happy.visible=false
  happy.scale=0.3

  foodobject=new Food()

  var mac = database.ref('Food');
  mac.on("value", readPosition, showError);
  feed = createButton("FEED DRAGO")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)
}

function draw() {  
background("#caadc2");
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  happy.visible=true
  dog.visible=false
}
foodobject.display()
  drawSprites();
  //add styles here
  fill("black");
  textSize(20);
  stroke(5);
  text("Press Up Arrow Key To Feed My MAC",80,70);
  
}
function readStock(data){
  foodS=data.val();
  foodobject.updateFoodStock(foodS)
}
function writeStock(x){
database.ref('/').update({
  food:x
})
}
function AddFood(){
  position++
  database.ref('/').update({
    Food:position
  }
  )}
  function FeedDog(){
     dog.addImage(dogimg2)
     foodobject.updateFoodStock(foodobject.getFoodStock()-1)
     database.ref('/').update({
       Food:foodobject.getFoodStock(),
       FeedTime:hour ()
     })
    }