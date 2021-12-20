img = "";
Status1 = "";
objectDetector_1 = "";
object = [];
Red = "";
Green = "";
Blue = "";
function preload(){}
function setup(){
    Canvas = createCanvas(380, 380);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.size(380, 380);
    Video.hide();
    objectDetector_1 = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Object Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    Status1 = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}
function draw(){
    image(Video, 0, 0, 380, 380);
    //Yes ma'am
    if(Status1 != ""){
        objectDetector_1.detect(Video, gotResult);
        Red = random(255);
        Blue = random(255);
        Green = random(255);
        for(i=0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Object Status: Detected!";
            document.getElementById("No_Obj").innerHTML = "Number Of Objects Detected: " + object.length;
            fill(Red, Green, Blue);
            noFill();
            Per_Cent = floor(object[i].confidence * 100);
            text(object[i].label + " " + Per_Cent + "%", object[i].x + 10, object[i].y + 20);
            textSize(15);
            stroke(Red, Green, Blue);
            rect(object[i].x, object[i].y, object[i].height, object[i].width);
        }
    }
}