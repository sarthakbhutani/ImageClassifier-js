let video;
let featureExtractor;
let knn;
let labelP;

function setup() {
  createCanvas(200, 200);
  video = createCapture(VIDEO);
  video.size(320,320);
	video.hide();
  featureExtractor = ml5.featureExtractor('MobileNet',modelLoaded);
  knn = ml5.KNNClassifier();
  labelP = createP("No training data yet");
  labelP.style('color','green');
  // feature = ml5.featureExtractor.infer(video);
  // let input = feature.dataSync();
  // console.log(input);
  // console.log(feature);
}

function draw() {
  background(100);
  image(video, 0, 0);
}

function modelLoaded() {
  console.log("model loaded");
}

function keyPressed(){
  let features = featureExtractor.infer(video);
  if(key=='h'){
    //ADD EXAMPLE DATASET
    knn.addExample(features,'human'); 
    console.log('human');
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