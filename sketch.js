var dog, happyDog, database, foodS, foodStock;
var dogimg, happyDogimg;

function preload(){
  dogimg = loadImage("images/Dog.png");
  happyDogimg = loadImage("images/HappyDog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 250);
  

  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showErr);
  console.log(foodStock);
}

function draw() {  
  background(46, 139, 87);
  dog.addImage(dogimg);
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogimg);
  }
  drawSprites();
  //add styles here
  stroke("black");
  text("Food :"+foodS, 200, 200);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    'Food':x
  })
}

function showErr() {
  console.log("Something is wrong with database");
}
