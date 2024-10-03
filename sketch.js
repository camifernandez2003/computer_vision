// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/5hT5jPwiI/"; // variable para almacenar la url

// Video
let video;
let flippedVideo; // dejar de usar
// To store the classification
let label = ""; // almacenar las etiquetas que creamos mouse, cartuchera
let confianza = 0;

// Load the model first
function preload() {
  // necesitamos que se cargue primero el modelo antes de que inicie la aplicación - antes que nuestro set up
  classifier = ml5.imageClassifier(imageModelURL + "model.json"); // objeto de la librería ml5 yy se genera un objeto que tiene una función - arriba la variable de la url
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO); // cc enciende la cámara
  video.size(320, 240); // creamos la variable arriba
  video.hide();

  //flippedVideo = ml5.flipImage(video);
  // Start classifying *
  classifyVideo(); //usar modelo para clasificar las imágenes
}

function draw() {
  background(25, 5, 200);
  // Draw the video
  image(video, 0, 0); //cambié por video

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4); //nombre de la etiqueta

  textSize(8);
  textAlign(LEFT);
  text(confianza, 10, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  // flippedVideo = ml5.flipImage(video);
  classifier.classify(video, gotResult); //cambié por video
  // flippedVideo.remove();
}

// When we get a result
function gotResult(results, error) {
  //
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }

  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label; //coge el resultado y lo almacena en la etiqueta
  confianza = results[0].confidence;

  // Classifiy again!
  classifyVideo();
}
