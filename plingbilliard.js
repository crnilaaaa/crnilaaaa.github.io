WebMidi.enable(function(err) {
  if(err) {
    console.log("blerg", err);
  }
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

  var noteMap = [
    "C4,", "E4,", "G4,", "B4,", "C4,", "E4,", "G4,", "B4,", 
    "D4,", "F4,", "G4,", "B4,", "D4,", "F4,", "G4,", "B4,",
    "A4,", "C4,", "E4,", "B4,", "A4,", "C4,", "E4,", "B4,",
    "E4,", "F4,", "A4,", "C4,", "E4,", "F4,", "A4,", "F4,",
    "G4,", "B4,", "C4,", "E4,", "G4,", "B4,", "C4,", "E4,",
    "B4,", "D4,", "F4,", "G4,", "B4,", "D4,", "F4,", "G4,",
    "E4,", "B4,", "A4,", "C4,", "E4,", "B4,", "A4,", "C4,",
    "C4,", "E4,", "F4,", "A4,", "C4,", "E4,", "F4,", "A4,", 
];
  
  var green = (btn) => { output.send(0x90, [btn, light_state[btn] = 1]); };
  var red = (btn) => { output.send(0x90, [btn, light_state[btn] = 2]); };
  var toggleblink = (btn) => { output.send(0x90, btn, Math.abs(light_state[btn] - 4)); }:
  
  function applyWorld() { 
    /*
    var siteState = [];
    for (var i = 0; i < 64; ++i) {
      siteState[i] = document.getElementById("checkbox" + i).checked; 
    }
    */
  }
  
  const click = new Tone.Loop(time => {
    new Tone.FMSynth().toDestination().triggerAttackRelease(myNote, "8n", time); // debug
    applyWorld();
  }, "4n").start(0);
    
  input.addListener('noteon', 'all',
    function(e) {
      var vv = e.data[1];
      var ll = light_state;
      console.log("noteon " + e.note.name + e.note.octave, e.data);
      if (vv == 98) 
        allOff();
      else if (vv < 64) {
        ll[vv]++;
        if(ll[vv] > 2) { ll[vv] = 0 };
        allOff();
        document.getElementById("checkbox" + vv).checked = ll[vv] != 0 ? true : false; // ??
        output.send(0x90, [vv, ll[vv]]);
        myNote = noteMap[vv];
      }
    }
  );
});

function doStart() {
  Tone.start();
  Tone.Transport.start();  
}
