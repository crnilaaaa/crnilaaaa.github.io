  var amen;
  var amenchops = [];
  var sprites = {};
  var iterator;
  var running = false;
  var notset = true;
  var easing_range;
  var valhist = [0,0,0,0,0];
  var maxval = 1;
  var sensor;
  var resulthist = [0, 3, 2, 1, 0];
  
/* idr why i thought i needed a camera? anyway
///// clean code belwo directly stoeln from: https://github.com/webrtc/samples/blob/gh-pages/src/content/getusermedia/canvas/js/main.js

  // Put variables in global scope to make them available to the browser console.
const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

const constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
///// clean code above directly from: https://github.com/webrtc/samples/blob/gh-pages/src/content/getusermedia/canvas/js/main.js
*/
    var flipbits = function (v, digits) {
        return ~v & (Math.pow(2, digits) - 1);
    }
    
  Wad.logs.verbosity = 2;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function make_amen() {
    for (var i = 1; i < 17; ++i) {
      amenchops[amenchops.length] = new Wad({source: `amen${i}.wav`});
    }
  }

  function figureOutWhichSlice(count) {
    var intensity = 0;
    var histmod = 0;
   
    for(var i = 0; i < valhist.length; ++i) {
      maxval = Math.max(valhist[i], maxval);
      histmod = histmod + valhist[i];
    }
   
    if(valhist[0] >= maxval) {
      document.getElementById("loggery").innerHTML = "fuckery!!<br/>" + document.getElementById("loggery").innerHTML;
      amenchops[resulthist[Math.random() > .5  ? 1 : Math.random() > .5 ? 2 : 4]].play({offset: 140, rate: 1.3});
    }
     
    intensity = Math.floor(histmod * 4 / (maxval * 5));
    maxval = maxval * .95;
    result = Math.abs(Math.floor(count % 4) * (1 + intensity));
    resulthist = [result, resulthist[0], resulthist[1], resulthist[2], resulthist[3]];
    document.getElementById("valhists").innerHTML = 
      (`<br />${valhist[0]}, <br />${valhist[1]}, <br />${valhist[2]}, <br />${valhist[3]}, <br />${valhist[4]}` 
       + "<br />count: " + count + " \nintensity: " + intensity + "\n: " + "\n result: " + result);
  
    return result;
  }

  function start_linacc_modulation() {
    if(!sensor) { 
      
      try {
        sensor_frequency = document.getElementById("rate");
        sensor = new LinearAccelerationSensor({frequency: 5});
        sensor.addEventListener('reading', () => {
          valhist = [Math.hypot(sensor.x, sensor.y, sensor.z), valhist[0], valhist[1], valhist[2], valhist[3]];
          document.getElementById("loggery").innerHTML = (`<br />${sensor.x}, <br />${sensor.y}, <br />${sensor.z}`);
        });
        sensor.start()
      }
      catch (e) {
        alert("no linear acceleration sensor: " + e.message);
        try {
          sensor = new Accelerometer();
          sensor.addEventListener('reading', () => {
            valhist = [Math.hypot(sensor.x, sensor.y, sensor.z - 9.8), valhist[0], valhist[1], valhist[2], valhist[3]];
            document.getElementById("loggery").innerHTML = (`<br />${sensor.x}, <br />${sensor.y}, <br />${sensor.z - 9.8}`);
          });
          sensor.start()
        }
        catch (e) {
          alert("no accelerometer: " + e.message); 
        }
      }
      
    }
  }

  function play_amen() {
    running = true;
    var delay;
    var count = 0;
    var recursefunc;
    recursefunc = function() {
      if (running) {
        delay = 333;
        count = count + 1;
        var which = figureOutWhichSlice(count);
        if (amenchops[which]) {
          amenchops[which].play({rate:1.2});
          setTimeout(recursefunc, delay);
        } else { alert("whoops again! " + which) }
      }
    };

    if (notset || !running) {
      setTimeout(recursefunc, delay);
      notset = false;
    }
  }

WebMidi.enable(function(err) {
  if(err) {
    console.log("blerg", err);
  }
  var input = WebMidi.inputs[2];
  var output = WebMidi.outputs[2];
  var light_state = [];
  var allOff = () => {
    for (var i = 0; i < 64; i++) {
      output.send(0x90, [light_state[i] = 0, 0]);
    }
  }
  allOff();

  input.addListener('noteon', 'all',
    function(e) {
      console.log("noteon " + e.note.name + e.note.octave, e.data);
      if(e.data[1] == 98) allOff();
      var vv = e.data[1];
      var ll = light_state;
      ll[vv]++;
      if(ll[vv] > 5) { ll[vv] = 0 };
      document.getElementById("checkbox" + vv).indeterminate = ll[vv] != 0 ? true : false; // ??
      output.send(0x90, [vv, ll[vv]]);
    }
  );
});


