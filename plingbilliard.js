function logg(text) {
  document.getElementById("log").prepend(text + "\n");
}

class APCMini {

  // https://raw.githubusercontent.com/PaulBGD/PixelFont/master/script.js
  #letters = letters = {
        'A': [
            [, 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1]
        ],
        'B': [
            [1, 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1],
            [1, 1]
        ],
        'C': [
            [1, 1, 1],
            [1],
            [1],
            [1],
            [1, 1, 1]
        ],
        'D': [
            [1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1]
        ],
        'E': [
            [1, 1, 1],
            [1],
            [1, 1, 1],
            [1],
            [1, 1, 1]
        ],
        'F': [
            [1, 1, 1],
            [1],
            [1, 1],
            [1],
            [1]
        ],
        'G': [
            [, 1, 1],
            [1],
            [1, , 1, 1],
            [1, , , 1],
            [, 1, 1]
        ],
        'H': [
            [1, , 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1],
            [1, , 1]
        ],
        'I': [
            [1, 1, 1],
            [, 1],
            [, 1],
            [, 1],
            [1, 1, 1]
        ],
        'J': [
            [1, 1, 1],
            [, , 1],
            [, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'K': [
            [1, , , 1],
            [1, , 1],
            [1, 1],
            [1, , 1],
            [1, , , 1]
        ],
        'L': [
            [1],
            [1],
            [1],
            [1],
            [1, 1, 1]
        ],
        'M': [
            [1, 1, 1, 1, 1],
            [1, , 1, , 1],
            [1, , 1, , 1],
            [1, , , , 1],
            [1, , , , 1]
        ],
        'N': [
            [1, , , 1],
            [1, 1, , 1],
            [1, , 1, 1],
            [1, , , 1],
            [1, , , 1]
        ],
        'O': [
            [1, 1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'P': [
            [1, 1, 1],
            [1, , 1],
            [1, 1, 1],
            [1],
            [1]
        ],
        'Q': [
            [0, 1, 1],
            [1, , , 1],
            [1, , , 1],
            [1, , 1, 1],
            [1, 1, 1, 1]
        ],
        'R': [
            [1, 1],
            [1, , 1],
            [1, , 1],
            [1, 1],
            [1, , 1]
        ],
        'S': [
            [1, 1, 1],
            [1],
            [1, 1, 1],
            [, , 1],
            [1, 1, 1]
        ],
        'T': [
            [1, 1, 1],
            [, 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        'U': [
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'V': [
            [1, , , , 1],
            [1, , , , 1],
            [, 1, , 1],
            [, 1, , 1],
            [, , 1]
        ],
        'W': [
            [1, , , , 1],
            [1, , , , 1],
            [1, , , , 1],
            [1, , 1, , 1],
            [1, 1, 1, 1, 1]
        ],
        'X': [
            [1, , , , 1],
            [, 1, , 1],
            [, , 1],
            [, 1, , 1],
            [1, , , , 1]
        ],
        'Y': [
            [1, , 1],
            [1, , 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        'Z': [
            [1, 1, 1, 1, 1],
            [, , , 1],
            [, , 1],
            [, 1],
            [1, 1, 1, 1, 1]
        ],
        '0': [
            [1, 1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        '1': [
            [, 1],
            [, 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        '2': [
            [1,1,1],
            [0,0,1],
            [1,1,1],
            [1,0,0],
            [1,1,1]
        ],
        '3':[
            [1,1,1],
            [0,0,1],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
        '4':[
            [1,0,1],
            [1,0,1],
            [1,1,1],
            [0,0,1],
            [0,0,1]
        ],
        '5':[
            [1,1,1],
            [1,0,0],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
        '6':[
            [1,1,1],
            [1,0,0],
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        '7':[
            [1,1,1],
            [0,0,1],
            [0,0,1],
            [0,0,1],
            [0,0,1]
        ],
        '8':[
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        '9':[
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
        ' ': [
            [, ,],
            [, ,],
            [, ,],
            [, ,],
            [, ,]
        ]
    };

  #rate = 1.2;

  #Buttons = {
    grid  : [],
    row   : [],
    col   : [],
    shift : [],
  }

  #Button = class {
    lightstate = 0;
    onNoteOn = 0;
    onNoteoff = 0;
    #apc;
    #id;

    constructor(apc, id) {
      this.apc = apc;
      this.id = id;
    };

    off()     { this.lightstate = 0; }

    on()      { this.lightstate = 1; }
    blink()   { this.lightstate = 2; }
    // row & col only have ^, grid has v, shift has none
    green()   { this.lightstate = 1; }
    red()     { this.lightstate = 3; }
    yellow()  { this.lightstate = 5; }

    toggleBlink() {
      this.lightstate += this.lightstate ? this.lightstate % 2 ? -1 : 1 : 0;
    }
    update() {
      setInterval(() => { this.apc.output(0x90, this.lightstate, this.id) }, 0);
    }
  }

  constructor(input, output) {
    this.input = input;
    this.output = output;;

    let chops = [
      new Wad({source: "amen13.wav"}),
      new Wad({source: "amen14.wav"}),
      new Wad({source: "amen15.wav"}),
      new Wad({source: "amen16.wav"}),
    ];
    // grid
    for(let i = 0; i < 64; ++i) {
      let newButton = this.Buttons.grid[i] = new this.#Button(this, i);
      let chop = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      newButton.onNoteOn = () => {
        chops[chop].play({ rate: rate });
      }
    }
    for(let i = 64; i < 72; ++i) {
      this.Buttons.row[i] = new this.#Button(this, i);
    }
    for(let i = 82; i < 90; ++i) {
      this.Buttons.col[i] = new this.#Button(this, i);
    }
    this.Buttons.shift = new this.#Button(this, 98);

    let handleOnOff = (on, e) => {
      if (e.data[0] == 0x90) {
        if (0 <= e.data[1] < 64) {
          on ? this.Buttons.grid[i].onNoteOn() : this.Buttons.grid[i].onNoteOff();
        }
        else if (64 <= e.data[1] < 72) {
          on ? this.Buttons.row[i].onNoteOn() : this.Buttons.row[i].onNoteOff();
        }
        else if (82 <= e.data[1] < 90) {
          on ? this.Buttons.col[i].onNoteOn() : this.Buttons.col[i].onNoteOff();
        }
        else if (e.data[1] = 98) {
          on ? this.Buttons.shift.onNoteOn() : this.Buttons.shift.onNoteOff();
        }
      }
      else if (e.data[0] == 0xB0) {
        // faders
      }
      else {
        console.log("not a stock APC mini! jsyk~");
      }
    }

    input.addListener('noteon', handleOnOff(true, e));
    input.addListener('noteoff', handleOnOff(false, e));
  }

  update() {
    Buttons.forEach(setInterval((b) => { b.update() }, 0));
  }
}

function doStart() {
  Tone.start();
  Tone.Transport.start();

  WebMidi.enable(function(err) {
    if(err) {
      logg("blerg", err);
    }

    var xstepLoop;
    var ystepLoop;
    var xstep = 0;
    var ystep = 0;
    var negxstep = false;
    var negystep = false;
    const stepkinds = [ "0", "1n", "2n", "2n.", "2t", "4n",
      "4n.", "4t", "8n", "8n.", "8t", "16n", "16n.", "16t",
      "32n", "32n.", "32t", "64n" ];

    var output;
    var input = output = WebMidi.inputs[document.getElementById("devicenumber").value];
    logg(input.value + " i/o " + output + "  " + document.getElementById("devicenumber").value);
    var elem = document.getElementById("devicenumber");
    elem.onchange = (e) => {
      var newval = document.getElementById("devicenumber").value;
      input = WebMidi.inputs[newval];
      output = WebMidi.outputs[newval];
      logg("changed device: " + e + " " + newval);
    };
    elem = document.getElementById("tempo");
    elem.onchange = (e) => {
      var newval = document.getElementById("tempo").value;
      Tone.Transport.bpm.value = newval;
      logg("changed tempo: " + tempo);
    }

    /* C major: 48 50 52 53 55 57 59 60
               0  2  4  5  7  9 11 12 */

    var toggled = false;
    var triggers = [];

    function xStep() {
      logg("xstep");
      if(triggers[position]) {
        // synth.triggerRelease(note[position]);
        red(position);
      } else { off(position) }
      var ypos = Math.floor(position / 8);
      xstep > 0 ? position++ : position--;
      position = position % 8;
      position = position < 0 ? position + 8 : position;
      position += 8 * ypos;
      if(triggers[position]) {
        // synth.triggerAttack(note[position]);
        amenchops[position % 16].play();
      }
      green(position);
    }

    function yStep() {
      logg("ystep");
      if(triggers[position]) {
        // synth.triggerRelease(note[position]);
        red(position);
      } else { off(position) }
      ystep > 0 ? position += 8 : position -= 8;
      position = position % 64;
      position = position < 0 ? position + 64 : position;
      if(triggers[position]) {
        // synth.triggerAttack(note[position]);
        amenchops[position % 16].play();
      }
      green(position);
    }

    var apc = new APCMini(input, output);

  });

}

/* # vim: set expandtab:tabstop=2:shiftwidth=2 */
