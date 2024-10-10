let osc, ampSlider, pitchSlider, filterSlider, volumeSlider, startButton;
let harmSlider;
let lowpassFilter, gain, isPlaying = false;
let analyser;

let xPosition;
let yStart = 150;

function setup() {
  // Create canvas and set up GUI
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  
  xPosition = width/2 - 150/2;
  
  addGUI()

  // Oscillator and Filter Setup
  osc = new Tone.FMOscillator(440, 'square');
  lowpassFilter = new Tone.Filter(1000, "lowpass").toDestination();
  gain = new Tone.Gain(0).connect(lowpassFilter); // Initial volume is zero
  osc.connect(gain);

  analyser = new Tone.Analyser("waveform", 2048); // Get waveform data
  gain.connect(analyser);
}

function draw() {
  background(255, 150, 150); // Static background color
  //console.log(analyser.getValue());

  let waveform = analyser.getValue();
  
  // Update oscillator values from GUI
  let harmValue = harmSlider.value();
  let pitchValue = pitchSlider.value();
  let filterValue = filterSlider.value();
  let ampValue = ampSlider.value();

  osc.harmonicity.value = harmValue;
  osc.frequency.value = pitchValue; // Set frequency (pitch)
  gain.gain.value = ampValue; // Set amplitude
  lowpassFilter.frequency.value = filterValue; // Set filter cutoff frequency

  //text 
  textSize(15);
  text('wave amp: ' + harmValue, xPosition, 150);
  text('frequency: ' + pitchValue, xPosition, 250);
  text('filter: ' + filterValue, xPosition, 350);
  text('ampValue ' + ampValue, xPosition, 450);

  sqx = width/4;
  sqy = 600
  sqw = width/2;
  sqh = height/4;
  

  //visualisation

  //draw rectangle
  fill(255);
  rect(width/4, 600, width/2, height/4);

  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, sqx, sqx + sqw);
    let y = map( waveform[i], -1, 1, sqy, sqy + sqh);
    vertex(x,y);
  }
  endShape();


}

function addGUI() {
  

  // harmonicity slider
  harmSlider = createSlider(0, 1, 0.5, 0.01);
  harmSlider.addClass("slider");
  harmSlider.position(xPosition, 100);
 
  
  // pitch slider
  pitchSlider = createSlider(50, 1000, 440, 1);
  pitchSlider.addClass("slider");
  pitchSlider.position(xPosition, 200);

  
  // filter slider
  filterSlider = createSlider(50, 5000, 1000, 1);
  filterSlider.addClass("slider");
  filterSlider.position(xPosition, 300);

  
  // Slider for Volume
  ampSlider = createSlider(0, 1, 0.5, 0.01);
  ampSlider.addClass("slider");
  ampSlider.position(xPosition, 400);

  
  // Start/Stop Button
  startButton = createButton("Start Sound");
  startButton.addClass("button");
  startButton.position(xPosition, 500);
  startButton.mousePressed(toggleSound);

 
}



function toggleSound() {
  if (!isPlaying) {
    Tone.start(); // Ensure audio context is started
    osc.start();
    isPlaying = true;
    startButton.html("Stop Sound");
  } else {
    osc.stop();
    isPlaying = false;
    startButton.html("Start Sound");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
