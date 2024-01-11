document.addEventListener('DOMContentLoaded', function() {
  const counterElement1 = document.getElementById('flip1');
  const counterElement2 = document.getElementById('flip2');
  const targetValue = 27;
  const duration = 2000; // in milliseconds
  const frameDuration = 1000 / 60; // assuming 60 frames per second

  const totalFrames = duration / frameDuration;
  const valueIncrement = targetValue / totalFrames;

  let currentFrame = 0;

  function animateCounter() {
    if (currentFrame <= totalFrames) {
      const animatedValue = Math.floor(currentFrame * valueIncrement);
      counterElement1.textContent = animatedValue % 10;
      counterElement2.textContent = animatedValue % 10;
      currentFrame++;
      requestAnimationFrame(animateCounter);
    } else {
      counterElement1.textContent = targetValue % 10;
      counterElement2.textContent = targetValue % 10;
    }
  }

  animateCounter();

// CREDIT FOR MICROPHONE CODE
// Travis Holliday
// https://codepen.io/travisholliday/pen/gyaJk
var navigator = window.navigator;
navigator.getUserMedia_ = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
if (navigator.getUserMedia_) {
  navigator.getUserMedia({
      audio: true
    },
    function(stream) {
      var fire0 = document.getElementById("fire0");
      var fire1 = document.getElementById("fire1");
      var fire2 = document.getElementById("fire2");
      var fire3 = document.getElementById("fire3");
      var fire4 = document.getElementById("fire4");
      
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

         // Load Happy Birthday song
    var audio = new Audio('https://raw.githubusercontent.com/simo7x/Bdaysara/main/Happy_Birthday.mp3');
    audio.crossOrigin = 'anonymous';
    audio.loop = true;

    // Autoplay the audio (requires user interaction)
    document.addEventListener('click', function() {
      audio.play();
    });
      var flameTimer = 0;

      javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;

          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }

          var average = values / length;
        
          if (flameTimer <= 50) flameTimer++;
          if ((average < 5) && (flameTimer > 50) && (fire4.style.display != "none")) {
            flameTimer = 0;
            fire0.style.display = "block";
            fire1.style.display = "block";
            fire2.style.display = "block";
            fire3.style.display = "block";
            fire4.style.display = "block";
          }
        
          if (average > 5) fire0.style.display = "none";
          if (average > 10) fire1.style.display = "none";
          if (average > 15) fire2.style.display = "none";
          if (average > 20) fire3.style.display = "none";
          if (average > 30) fire4.style.display = "none";

        } // end fn stream
    },
    function(err) {
      console.log("The following error occured: " + err.name)
    });
} else {
  console.log("getUserMedia not supported");
}
