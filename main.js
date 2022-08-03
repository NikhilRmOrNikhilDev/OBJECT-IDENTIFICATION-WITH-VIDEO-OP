statu = "";
object = [];
function preload(){
}
function setup(){
    canvas = createCanvas(380, 380)
    canvas.position();

    video = createCapture(VIDEO)
    video.size(380, 380);
    video.hide();
   
    
}
function start(error){
    if(error){
        console.error(error)
    }
    else{
        objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    }
}
function draw(){
    image(video, 0, 0, 380, 380);
   
    if(statu != ""){
        objectDetector.detect(video, gotResults);
        for( i=0; i<object.length; i++ ){
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Object Detected!...";
            document.getElementById("num").innerHTML = "Number of Object Detected " + object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%", object[i].x + 15 , object[i].y + 15)
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width + 100, object[i].height + 100);

        }
    }
}
function modelLoaded(){
    console.log("ModelLoaded!!!");
    statu = true;
  
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}