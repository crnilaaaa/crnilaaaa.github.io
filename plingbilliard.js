function logg(text) {
  document.getElementById("log").prepend(text + "\n");
}

class APCMini {

  // https://raw.githubusercontent.com/PaulBGD/PixelFont/master/script.js
  #letters = {
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

  #Cursor = class {
    posx = 0;
    posy = 0;
    stepxfreq = 0;
    stepyfreq = 0;
    stepxlen = 0;
    stepylen = 0;
    #apc;
    #update;

    stepkinds = [ "0", "1n", "2n", "2n.", "2t", "4n",
      "4n.", "4t", "8n", "8n.", "8t", "16n", "16n.", "16t",
      "32n", "32n.", "32t", "64n" ];

    constructor(apc) {
      this.#apc = apc;
      this.#update = () => {
        posx += stepxlen;
        posy += stepylen;
        this.#apc.Buttons[posx + 8 * posy].on();
      }
      Tone.Transport.
    }

  };

  #rate = 1.0;

  Buttons = {
    grid  : [],
    row   : [],
    col   : [],
    shift : [],
  };

  #Button = class {
    lightstate = 0;
    onNoteOn = 0;
    onNoteoff = 0;
    #apc;
    #id;
    #update;

    constructor(apc, id) {
      this.apc = apc;
      this.id = id;
      this.#update = () => {
        this.apc.output.send(0x90, [this.id, this.lightstate]);
      }
    };

    off()     { this.lightstate = 0; this.#update() }

    on()      { this.lightstate = 1; this.#update() }
    blink()   { this.lightstate = 2; this.#update() }
    // row & col only have ^, grid has v, shift has none
    green()   { this.lightstate = 1; this.#update() }
    red()     { this.lightstate = 3; this.#update() }
    yellow()  { this.lightstate = 5; this.#update() }

    toggleBlink() {
      this.lightstate += this.lightstate ? this.lightstate % 2 ? -1 : 1 : 0;
    }

  };

  constructor(input, output) {
    this.input = input;
    this.output = output;;

    let chops = [
      new Wad({source: "amen13.wav"}),
      new Wad({source: "amen14.wav"}),
      new Wad({source: "amen15.wav"}),
      new Wad({source: "amen16.wav"}),
    ];

    for(let i = 0; i < 64; ++i) {
      let newButton = this.Buttons.grid[i] = new this.#Button(this, i);
      let chop = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      newButton.onNoteOn = () => {
        chops[chop].play({ rate: this.#rate });
        newButton.on();
      };
      newButton.onNoteOff = () => {
        newButton.off();
      }
    }

    for(let i = 64; i < 72; ++i) {
      let newButton = this.Buttons.row[i] = new this.#Button(this, i);
      newButton.onNoteOn = () => {
        newButton.on();
      };
      newButton.onNoteOff = () => {
        newButton.off();
      }
    }

    for(let i = 82; i < 90; ++i) {
      let newButton = this.Buttons.col[i] = new this.#Button(this, i);
      newButton.onNoteOn = () => {
        newButton.on();
      };
      newButton.onNoteOff = () => {
        newButton.off();
      }
    }

    this.Buttons.shift = new this.#Button(this, 98);
    this.Buttons.shift.onNoteOn = () => {
      // no light
    }
    this.Buttons.shift.onNoteOff = () => {
    }

    let handleOnOff = (on, e) => {
      if (e.data[0] == 0x90 || e.data[0] == 0x80) {
        console.log("data: " + e.data);
        if (0 <= e.data[1] && e.data[1] < 64) {
          if (on) {
            this.Buttons.grid[e.data[1]].onNoteOn();
            logg("handling on");
          }
          else {
            this.Buttons.grid[e.data[1]].onNoteOff();
            logg("handling off");
          }
        }
        else if (64 <= e.data[1] && e.data[1] < 72) {
          on ? this.Buttons.row[e.data[1]].onNoteOn()
            : this.Buttons.row[e.data[1]].onNoteOff();
        }
        else if (82 <= e.data[1] && e.data[1] < 90) {
          on ? this.Buttons.col[e.data[1]].onNoteOn()
            : this.Buttons.col[e.data[1]].onNoteOff();
        }
        else if (e.data[1] == 98) {
          on ? this.Buttons.shift.onNoteOn() : this.Buttons.shift.onNoteOff();
        }
      }
      else if (e.data[0] == 0xB0) {
        // faders
      }
    }

    input.addListener('noteon', "all", (e) => { logg("on??"); handleOnOff(true, e) });
    input.addListener('noteoff', "all", (e) => { logg("off??"); handleOnOff(false, e) });
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

    var output = WebMidi.outputs[document.getElementById("devicenumber").value];;
    var input = WebMidi.inputs[document.getElementById("devicenumber").value];

    logg("input: " + input + " output: " + output + "  " + " number:" +
      document.getElementById("devicenumber").value);

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

// vim: expandtab:tabstop=2:shiftwidth=2 
