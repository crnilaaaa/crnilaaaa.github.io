function logg(text) {
  document.getElementById("log").prepend(text + "\n");
}

WebMidi.enable(function(err) {
  if(err) {
    logg("blerg", err);
  }
  var synth = new Tone.PolySynth({ release: .1 }).toDestination();
  var input = WebMidi.inputs[2];
  var output = WebMidi.outputs[2];
  var light_state = [];
  var position = 0;
  for (var i = 0; i < 64; i++) { light_state[i] = 0 };
  var allOff = () => {
    for (var i = 0; i < 64; i++) {
      output.send(0x90, [i, light_state[i] = 0]);
      document.getElementById("checkbox" + i).indeterminate = false; // ??
    }
  };
  
  var octaveRange = 0;
  var noteStep = 1;
  var xstep = 0;
  var ystep = 0;
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
  const stepkinds = [
    "1n",
    "2n",
    "2n.",
    "2t",
    "4n",
    "4n.",
    "4t",
    "8n",
    "8n.",
    "8t",
    "16n",
    "16n.",
    "16t",
    "32n",
    "32n.",
    "32t",
    "64n"
    ];
  
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
      document.getElementById("textbox" + i).text = note[i];
    }
  }
 
  setUpNoteGrid();
  
  var green = (btn) => { output.send(0x90, [btn, light_state[btn] = 1]); };
  var red = (btn) => { output.send(0x90, [btn, light_state[btn] = 3]); };
  var toggleblink = (btn) => { output.send(0x90, btn, Math.abs(light_state[btn] - 4)); };
  var off = (btn) => { output.send(0x90, [btn, 0]); };

  var xstepLoop;
  var ystepLoop; 
  var toggled = false;
  var triggers = [];
  
  input.addListener('noteoff', 'all', function(e) { 
    if (e.data[1] < 64) { 
      synth.triggerRelease(note[e.data[1]]);
      if (!toggled) off(e.data[1]);
      if (triggers[e.data[1]]) red(e.data[1]);
    }
    if (e.data[1] == 98) {
      logg("toggled: " + (toggled = false));
      if(xstepLoop) {
        xstepLoop.stop();
        xstepLoop.dispose(); // vOv
      }
      logg(
      xstepLoop = new Tone.Loop((time) => {
        position += xstep;
        }, stepkinds[xstep]).start(0));
      if(ystepLoop) {
        ystepLoop.stop();
        ystepLoop.dispose();
      }
      logg(
        ystepLoop = new Tone.Loop((time) => {
        position += ystep * 8;
        }, stepkinds[ystep]).start(0));
    }
  });
  
  input.addListener('noteon', 'all',
    function(e) {
      var vv = e.data[1];
      var ll = light_state;
      if (vv == 98) 
        logg("toggled: " + (toggled = true));
      // messyyyy :( 
      // gotta sort the toggle better etc
      if (vv < 64) {        
        if (toggled) {
          if(triggers[vv]) {
            logg("trigger " + vv + ": " + (triggers[vv] = false));
            off(vv);
          } else {
            logg("trigger " + vv + ": " + (triggers[vv] = true));
            red(vv);
          }
        } else { 
          green(vv); 
          synth.triggerAttack(note[vv]);
          logg("playing " + note[vv] + " triggered by " + vv );
        }
      }
      else if (toggled && 63 < vv < 68) {
        switch(vv) {
          case 64: ++ystep; break;
          case 65: --ystep; break;
          case 66: --xstep; break;
          case 67: ++xstep; break;
          default: break;
        }
        xstep = xstep < 0 ? 0 : xstep;
        xstep = xstep == stepkinds.length ? stepkinds.length - 1 : xstep
        ystep = ystep < 0 ? 0 : ystep;
        ystep = ystep == stepkinds.length ? stepkinds.length - 1 : ystep
        logg("xstep: " + xstep + " ystep: " + ystep);
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
