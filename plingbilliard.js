function logg(text) {
  document.getElementById("log").prepend(text + "\n");
}

WebMidi.enable(function(err) {
  if(err) {
    logg("blerg", err);
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
        __scalePosition -= 7
      }
      if (octave > octaveRange + 3) {
        octave = 3; 
      }
      return ["C", "D", "E", "F", "G", "A", "B"][__scalePosition];
    }
    
    note[0] = "C3";
    for(var i = 1; i < 64; ++i) {
       note[i] = scale(step) + octave; 
    }
  }

  setUpNoteGrid();
  logg(note);
  
  var green = (btn) => { output.send(0x90, [btn, light_state[btn] = 1]); };
  var red = (btn) => { output.send(0x90, [btn, light_state[btn] = 3]); };
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
  var toggled = false;
  var loops = { src: [], obj: []};
  
  input.addListener('noteoff', 'all', function(e) { 
    off(e.data[1]);
    if (e.data[1] < 64) { 
      synth.triggerRelease(note[e.data[1]]);
      togglecheck(e.data[1]);
      logg("stopping " + note[e.data[1]] + " triggered by " + e.data[1] );
      if(toggled) {
        loops.src[e.data[1]] = "";
        logg("unlooping " + note[e.data[1]]);
      }
    }
    if (e.data[1] == 98) {
      logg("toggled: " + (toggled = false));
      Tone.Transport.clear();
      for (var i = 0; i < 64; ++i) {
        if(loops.obj[i]) {
          loops.obj[i].start(0);
        }
      }
    }
  });
  
  input.addListener('noteon', 'all',
    function(e) {
      var vv = e.data[1];
      var ll = light_state;
      if (vv == 98) 
        logg("toggled: " + (toggled = true));
      if (vv < 64) {        
        togglecheck(vv);
        synth.triggerAttack(note[vv]);
        logg("playing " + note[vv] + " triggered by " + vv );
        if (toggled) {
          if(loops.src[vv]) {
            loops.src[vv] = "";
          } else {
            loops.src[vv] = "8n";
            logg("prelooping: " + note[vv] + " every 4n for " + loops.src[vv]);
            loops.obj[vv] = new Tone.Loop((time) => {
              synth.triggerAttackRelease(note[vv], loops.src[vv]);
              logg("looping: " + note[vv] + " every 4n for " + loops.src[vv]);
            }, "4n");
          }
          red(vv);
        } else { green(vv); }
      }
      else if (vv == 64) {
        setUpNoteGrid(++noteStep);
        logg("notestep: " + noteStep);
      }
      else if (vv == 65) {
        if (noteStep > 0) {
          setUpNoteGrid(--noteStep);
        }
        logg("notestep: " + noteStep);
      }
      else if (vv == 66) {        
        octaveRange > 0 ? logg("octave range: " + --octaveRange) : logg("octave range min");
        setUpNoteGrid(noteStep);
      }
      else if (vv == 67) {
        logg("octave range: " + (++octaveRange));
        setUpNoteGrid(noteStep);
      }
    }
  );
});

function doStart() {
  Tone.start();
  Tone.Transport.start();
}
