let video;
let featureExtractor;
let knn;
let labelP;

function setup() {
  createCanvas(400, 400);
//   var video = document.getElementById('video');
// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
//  video.src = window.URL.createObjectURL(stream);
//  video.play();
//  });
// }
  video = createCapture(VIDEO);

  video.size(600,600);
	video.hide();
  featureExtractor = ml5.featureExtractor('MobileNet',modelLoaded);
  knn = ml5.KNNClassifier();
  labelP = createP("No training data yet");
  labelP.style('color','green');

  button = createButton('human');
  button.position(input.x + input.width, 65);
  button.mousePressed(btnPress);
  // feature = ml5.featureExtractor.infer(video);
  // let input = feature.dataSync();
  // console.log(input);
  // console.log(feature);
}

function draw() {
  background(230);
  // image(video, 10, 10);
}

function modelLoaded() {
  console.log("model loaded");
}

function btnPress(){
  console.log("sup");
  let features = featureExtractor.infer(video);
  if(val=='h'){
    //ADD EXAMPLE DATASET
    knn.addExample(features,'human'); 
    console.log('human');
    document.getElementById("change").innerHTML = "Hello World";
  }
  else if(val=='n'){
    knn.addExample(features,'notHuman');
    console.log('not human');
  } 
  else if (key=='p') {
    knn.classify(features,gotResult);
  }
}

function keyPressed(){
  let features = featureExtractor.infer(video);
  if(key=='h'){
    //ADD EXAMPLE DATASET
    knn.addExample(features,'human'); 
    console.log('human');
    document.getElementById("change").innerHTML = "Hello World";
  }
  else if(key=='n'){
    knn.addExample(features,'notHuman');
    console.log('not human');
  } else if (key=='s'){
    knn.save('humanNotHuman');
    console.log('saved');
  }
  //predicting
  else if (key=='p') {
    knn.classify(features,gotResult);
  }
}

function gotResult(error,result){
  if (error){
    console.error(error);
  }
  else{
   // let feauture = featureExtractor.infer(video);
    //let input = feature.dataSync();
    // console.log(input);
    labelP.html(result.label);
    console.log(result);
    // let input = feature.dataSync();
    // console.log(input);
    // labelP.html(result.label);
    console.log('working till here, after being updated');
  }
}


// Further Ideas:
// functionality to create your own labels/classes
// add html elements, buttons, create games
// play with Tensor & dataSync() element