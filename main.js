function setup(){
canvas=createCanvas(600,520);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}


function draw(){
//background("purple");
song1Status=song1.isPlaying();
song2Status=song2.isPlaying();
image(video,0,0,600,520);
fill("black");
stroke("grey");

if(scoreleftwrist > 0.2){
circle(leftWristX,leftWristY,18);
song1.stop();
if(song2Status==false){
song2.play();
}
}

if(scorerightwrist > 0.2){
  circle(rightWristX,rightWristY,18);
 song2.stop();
if(song1Status==false){
song1.play();
 }
 }
}


song1="";
song2="";
song1Status="";
song2Status="";
function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}






function play(){
song.play();
song.setVolume(1);
song.rate(2.5);
}

rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreleftwrist=0;
scorerightwrist=0;



function modelLoaded(){
console.log("Pose net has loaded.");    
}



function gotPoses(results) {
if( results.length > 0){
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
scoreleftwrist = results[0].pose.keypoints[9].score;
scorerightwrist = results[0].pose.keypoints[10].score;
}    
}
