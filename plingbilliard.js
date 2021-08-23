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
  
  function applyWorld() { }
  var myNote = "C2";
  
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
        if(ll[vv] > 6) { ll[vv] = 0 };
        document.getElementById("checkbox" + vv).indeterminate = ll[vv] != 0 ? true : false; // ??
        output.send(0x90, [vv, ll[vv]]);
        myNote = vv + 12;
      }
    }
  );
});

function doStart {
  Tone.Transport.start();  
}
