WebMidi.enable(function(err) {
  if(err) {
    console.log("blerg", err);
  }
  var synth = new Tone.PolySynth().toDestination();
  var input = WebMidi.inputs[2];
  var output = WebMidi.outputs[2];
  var light_state = [];
  for (var i = 0; i < 64; i++) { light_state[i] = 0 };
  var allOff = () => {
    for (var i = 0; i < 64; i++) {
      output.send(0x90, [i, light_state[i] = 0]);
      document.getElementById("checkbox" + i).indeterminate = false; // ??
    }
  };
  
  var octaveRange = 0;
  var noteStep = 1;
  var note = 
   [0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0];

  /* C major: 48 50 52 53 55 57 59 60
             0  2  4  5  7  9 11 12 */
  
  function setUpNoteGrid(step = 1) {
    var __scalePosition = 0;
    var octave = 3;
    var scale = (step = 1) => {
      __scalePosition += step;
      if (__scalePosition >= 7) {
        octave++;
        __scalePosition = 0
      }
      if (octave > octaveRange + 3) {
        octave = 3; 
      }
      return ["C", "D", "E", "F", "G", "A", "B"][__scalePosition];
    }
    
    for(var i = 0; i < 64; ++i) {
       note[i] = scale(step) + octave; 
    }
  }

  setUpNoteGrid();
  console.log(note);
  
  var green = (btn) => { output.send(0x90, [btn, light_state[btn] = 1]); };
  var red = (btn) => { output.send(0x90, [btn, light_state[btn] = 2]); };
  var toggleblink = (btn) => { output.send(0x90, btn, Math.abs(light_state[btn] - 4)); };
  var off = (btn) => { output.send(0x90, [btn, 0]); };
  var togglecheck = (ck) => {  document.getElementById("checkbox" + ck).checked =
    document.getElementById("checkbox" + ck).checked ? false : true; };

  function applyWorld() { 
      /*
      var siteState = [];
      for (var i = 0; i < 64; ++i) {
        siteState[i] = document.getElementById("checkbox" + i).checked; 
      }
      */
  }
  
  input.addListener('noteoff', 'all', 
    function(e) { 
      off(e.data[1]); 
      if (e.data[1] < 64) { 
        synth.triggerRelease(note[e.data[1]]);
        togglecheck(e.data[1]);
        // console.log("stopping " + note[e.data[1]] + " triggered by " + e.data[1] );
      }
  });
  
  input.addListener('noteon', 'all',
    function(e) {
      var vv = e.data[1];
      var ll = light_state;
      if (vv == 98) 
        allOff();
      else if (vv < 64) {
        green(vv);
        togglecheck(vv);
        synth.triggerAttack(note[vv]);
        // console.log("playing " + note[vv] + " triggered by " + vv );
      }
      else if (vv == 64) {
        setUpNoteGrid(++noteStep);
        console.log("notestep: " + noteStep);
      }
      else if (vv == 65) {
        if (noteStep > 0) {
          setUpNoteGrid(--noteStep);
        }
        console.log("notestep: " + noteStep);
      }
      else if (vv == 66) {        
        octaveRange > 0 ? --octaveRange : console.log("octave range min");
      }
      else if (vv == 67) {
        console.log("octave range: " + (++octaveRange));
      }
    }
  );
});

function doStart() {
  Tone.start();
  Tone.Transport.start();
}
