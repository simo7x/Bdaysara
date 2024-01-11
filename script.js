// CREDIT FOR MICROPHONE CODE
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
document.addEventListener('DOMContentLoaded', function () {
  const counterElement = document.querySelector('.counter');
  const targetValue = 27;
  const duration = 2000; // in milliseconds
  const frameDuration = 1000 / 60; // assuming 60 frames per second

  const totalFrames = duration / frameDuration;
  const valueIncrement = targetValue / totalFrames;

  let currentFrame = 0;

  function animateCounter() {
    if (currentFrame <= totalFrames) {
      const animatedValue = Math.floor(currentFrame * valueIncrement);
      const digitString = animatedValue.toString().padStart(2, '0');
      updateCounterDigits(digitString);
      currentFrame++;
      requestAnimationFrame(animateCounter);
    } else {
      const targetString = targetValue.toString().padStart(2, '0');
      updateCounterDigits(targetString);
    }
  }

  function updateCounterDigits(value) {
    const digitElements = counterElement.querySelectorAll('.digit-flipper__digit');
    for (let i = 0; i < digitElements.length; i++) {
      const digit = parseInt(value[i], 10);
      const digitFlipper = digitElements[i].closest('.digit-flipper');
      digitFlipper.classList.remove('digit-flipper__digit--flip-top', 'digit-flipper__digit--flip-bottom', 'digit-flipper__digit--flip-done');
      digitFlipper.style.zIndex = '';
      digitFlipper.querySelector('.digit-flipper__digit-top').textContent = digit;
      digitFlipper.querySelector('.digit-flipper__digit-bottom').textContent = digit;
    }
  }

  animateCounter();
});
