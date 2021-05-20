img= "";
status="";
objects=[];
function preload(){
    img=loadImage("dog_cat.jpg");
}
function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_bar").innerHTML="status: Detecting Object ";

    
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(VIDEO,gotResult);
        for(i = 0; i<objects.length;i++){
            document.getElementById("status_bar").innerHTML="status_bar";
            document.getElementById("number_objects").innerHTML="no of objects detected is "+objects.length;
            fill(r,g,b);
   
    
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15  );
            noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    

    
        }

    }
    

}

function modelLoaded(){
console.log("MODEL LOADED");
status=true;
objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{

    
    console.log(results);}
    objects=results;
}