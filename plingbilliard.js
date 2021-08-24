function logg(text) {
  document.getElementById("log").prepend(text + "\n");
}

WebMidi.enable(function(err) {
  if(err) {
    logg("blerg", err);
  }

  var xstepLoop;
  var ystepLoop;
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
  const stepkinds = [
    "0",
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

  var synth = new Tone.PolySynth({ release: .1 }).toDestination();
  var input = WebMidi.inputs[document.getElementById("devicenumber").value];
  var output = WebMidi.outputs[document.getElementById("devicenumber").value];
  logg(input.value + " i/o " + output + "  " + document.getElementById("devicenumber").value);
  var elem = document.getElementById("devicenumber");
  logg(elem);
  elem.onchange = (e) => {
    var newval = document.getElementById("devicenumber").value
    input = WebMidi.inputs[newval];
    output = WebMidi.outputs[newval];
    logg("changed device: " + e);
  };
  var light_state = [];
  var position = 0;
  for (var i = 0; i < 64; i++) { light_state[i] = 0 };
  var allOff = () => {
    for (var i = 0; i < 64; i++) {
      output.send(0x90, [i, light_state[i] = 0]);
      document.getElementById("checkbox" + i).indeterminate = false; // ??
    }
  };
  
  /* C major: 48 50 52 53 55 57 59 60
             0  2  4  5  7  9 11 12 */
  
  function setUpNoteGrid(step = 1) {
    var __scalePosition = 0;
    var octave = 4;
    var scale = (step = 1) => {
      __scalePosition += step;
      if (__scalePosition >= 7) {
        octave++;
        __scalePosition -= 7
      }
      if (octave > octaveRange + 4) {
        octave = 3; 
      }
      return ["C", "D", "E", "F", "G", "A", "B"][__scalePosition];
    }
    
    note[0] = "C4";
    document.getElementById("textbox0").value = note[0];
    for(var i = 1; i < 64; ++i) {
      note[i] = scale(step) + octave;
      document.getElementById("textbox" + i).value = note[i];
    }
  }
 
  setUpNoteGrid();
  
  var green = (btn) => { output.send(0x90, [btn, light_state[btn] = 1]); };
  var red = (btn) => { output.send(0x90, [btn, light_state[btn] = 3]); };
  var toggleblink = (btn) => { output.send(0x90, btn, Math.abs(light_state[btn] - 4)); };
  var off = (btn) => { output.send(0x90, [btn, 0]); };

  var toggled = false;
  var triggers = [];

  function xStep() {
    logg("xstep");
    if(triggers[position]) {
      synth.triggerRelease(note[position]);
      red(position);
    } else { off(position); }
    position++;
    position = position % 64;
    position = position < 0 ? position + 64 : position;
    if(triggers[position]) {
      synth.triggerAttack(note[position]);
    }
    green(position);
  }

  function yStep() {
    logg("ystep");
    if(triggers[position]) {
      synth.triggerRelease(note[position]);
      red(position);
    } else { off(position); }
    position += 8;
    position = position % 64;
    position = position < 0 ? position + 64 : position;
    if(triggers[position]) {
      synth.triggerAttack(note[position]);
    }
    green(position);
  }
  
  input.addListener('noteoff', 'all', function(e) { 
    if (e.data[1] < 64) { 
      synth.triggerRelease(note[e.data[1]]);
      if (triggers[e.data[1]]) red(e.data[1]);
      if (!toggled) off(e.data[1])
      else red(e.data[1]);
    }
    if (e.data[1] == 98) {
      logg("toggled: " + (toggled = false));
    }
    if (toggled && 63 < e.data[1] < 68) {
      off(e.data[1]);
      switch(e.data[1]) {
        case 64: 
        case 65: if (ystepLoop) ystepLoop.stop, ystepLoop.dispose();
          document.getElementById("ysteptextbox").value = ystep;
          ystepLoop = new Tone.Loop((time) => { yStep(); }, 
            stepkinds[ystep]).start(Tone.now() + (new Tone.Time(ystep)).quantize(ystep));
          break;
        case 66: 
        case 67: if (xstepLoop) xstepLoop.stop, xstepLoop.dispose();
          document.getElementById("xsteptextbox").value = xstep;
          xstepLoop = new Tone.Loop((time) => { xStep(); }, 
            stepkinds[xstep]).start(Tone.now() + (new Tone.Time(xstep)).quantize(xstep));
          break;
      }
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
        green(vv);
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
        logg("xstep: " + xstep + " " + stepkinds[xstep] + "  ystep: " + ystep + " " + stepkinds[ystep]);
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
