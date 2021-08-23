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
    var __scalePosition = 0
    var scale = (step = 1) => {
      __scalePosition += step;
      return ["C", "D", "E", "F", "G", "A", "B"][__scalePosition % 7];
    }
    for(var i = 0; i < 64; ++i) {
       note[i] = scale(step) + "4"; 
    }
  }

  setUpNoteGrid();
  console.log(note);
  
  var green = (btn) => { output.send(0x90, [btn, light_state[btn] = 1]); };
  var red = (btn) => { output.send(0x90, [btn, light_state[btn] = 2]); };
  var toggleblink = (btn) => { output.send(0x90, btn, Math.abs(light_state[btn] - 4)); };
  var off = (btn) => { output.send(0x90, [btn, 0]); };


  function applyWorld() { 
      /*
      var siteState = [];
      for (var i = 0; i < 64; ++i) {
        siteState[i] = document.getElementById("checkbox" + i).checked; 
      }
      */
  }
  /*
  const click = new Tone.Loop(time => {
    new Tone.FMSynth().toDestination().triggerAttackRelease(myNote, "8n", time); // debug
    applyWorld();
  }, "4n").start(0);
  */
    input.addListener('noteoff', 'all', 
      function(e) { 
        off(e.data[1]); 
        if (e.data[1] < 64) { 
          synth.triggerRelease(note[e.data[1]]);
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
          document.getElementById("checkbox" + vv).checked = ll[vv] != 0 ? true : false; // ??  
          synth.triggerAttack(note[vv]);
          // console.log("playing " + note[vv] + " triggered by " + vv );
        }
        else if (vv == 64) {
          setUpNoteGrid(++noteStep);
          console.log("notestep: " + noteStep);
        }
        else if (vv == 65) {
          console.log("notestep: " + noteStep);
          if (step > 0) {
            setUpNoteGrid(--noteStep);
          }
        }
      }
    );
});

function doStart() {
  Tone.start();
  Tone.Transport.start();
}
