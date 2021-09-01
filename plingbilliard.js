function logg(text = false) {
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
    stepxfreq = 5;
    stepyfreq = 5;
    stepxlen = 0;
    stepylen = 0;
    apc;
    running = false;
    color = 1;

    stepkinds = [ "1n", "2n", "2n.", "2t", "4n",
      "4n.", "4t", "8n", "8n.", "8t", "16n", "16n.", "16t",
      "32n", "32n.", "32t", "64n" ];

    yfreqinc() {
      logg("stepyfreq: " + (this.stepyfreq < this.stepkinds.length ? this.stepkinds[++this.stepyfreq] : this.stepkinds[this.stepkinds.length - 1]));
    }

    yfreqdec() {
      logg("stepyfreq: " + (this.stepyfreq > 0 ? this.stepkinds[--this.stepyfreq] : this.stepkinds[0]));
    }

    xfreqinc() {
      logg("stepxfreq: " + (this.stepxfreq < this.stepkinds.length ? this.stepkinds[++this.stepxfreq] : this.stepkinds[this.stepkinds.length - 1]));
    }

    xfreqdec() {
      logg("stepxfreq: " + (this.stepxfreq > 0 ? this.stepkinds[--this.stepxfreq] : this.stepkinds[0]));
    }

    updatex(time) {
      logg("updating");
      let nextTime = Tone.Time(Tone.Time(Tone.getTransport().position) + Tone.Time(this.stepkinds[this.stepxfreq]));
      Tone.getTransport().schedule((innertime) => {
        logg("recurse call");
        this.updatex(innertime);
      }, nextTime);

      if (this.running) {
        Tone.getTransport().schedule((innertime) => {
          logg("off??");
          btn.off();
        }, Tone.Time(time) + Tone.Time(this.stepkinds[this.stepxfreq]) / 2);
        logg("running");
        let gridpos = parseInt(8 * parseInt(this.posy) + parseInt(this.posx));
        let btn = this.apc.Buttons.grid[gridpos];
        btn.onNoteOff();
        (this.posx += this.stepxlen) < 0 ? this.posx += 8 : this.posx %= 8;

        gridpos = this.posx + 8 * this.posy;
        btn = this.apc.Buttons.grid[gridpos];
        btn.onNoteOn(true);
      }
    }

    updatey(time) {
      logg("updating");
      let nextTime = Tone.Time(Tone.Time(Tone.getTransport().position) + Tone.Time(this.stepkinds[this.stepyfreq]));
      Tone.getTransport().schedule((innertime) => {
        logg("recurse call");
        this.updatey(innertime);
      }, nextTime);

      if (this.running) {
        Tone.getTransport().schedule((innertime) => {
          logg("off??");
          btn.off();
        }, Tone.Time(time) + Tone.Time(this.stepkinds[this.stepyfreq]) / 2);
        logg("running");
        let gridpos = parseInt(8 * parseInt(this.posy) + parseInt(this.posy));
        let btn = this.apc.Buttons.grid[gridpos];
        btn.onNoteOff();

        (this.posy += this.stepylen) < 0 ? this.posy += 8 : this.posy %= 8;

        gridpos = this.posy + 8 * this.posy;
        btn = this.apc.Buttons.grid[gridpos];
        btn.onNoteOn(true);
      }
    }

    constructor(apc, posx, posy) {
      logg("constructor Cursor");
      if (posx > 7 || posy > 7) {
        throw("wrong posx: " + posx + " posy: " + posy);
      }
      this.posx = posx;
      this.posy = posy;
      this.apc = apc;
      logg("done new cursor");
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

    off()         { this.lightstate = 0; this.#update() }

    on(color = 1) { this.lightstate = color; this.#update() }
    blink()       { this.lightstate = 2; this.#update() }
    // row & col only have ^, grid has v, shift has none
    green()       { this.lightstate = 1; this.#update() }
    red()         { this.lightstate = 3; this.#update() }
    yellow()      { this.lightstate = 5; this.#update() }

    toggleBlink() {
      this.lightstate += this.lightstate ? this.lightstate % 2 ? -1 : 1 : 0;
    }

  };

  constructor(input, output) {
    let cursors = [];
    var lastGrid = [];
    let curCursor = 0;
    this.input = input;
    this.output = output;

    let chops = [
      new Wad({source: "amen1.wav"}),
      new Wad({source: "amen2.wav"}),
      new Wad({source: "amen4.wav"}),
      new Wad({source: "amen8.wav"}),
      new Wad({source: "amen7.wav"}),
      new Wad({source: "amen6.wav"}),
    ];

    for(let i = 0; i < 64; ++i) {
      let newButton = this.Buttons.grid[i] = new this.#Button(this, i);
      let chop = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
      // TODO: hardcoded bool param :l
      newButton.onNoteOn = (isCursor = false) => {
        chops[chop].play({ rate: this.#rate });
        newButton.on();
      };
      newButton.onNoteOff = () => {
        newButton.off();
      }
    }

    for(let i = 64; i < 72; ++i) {
      let newButton = this.Buttons.row[i] = new this.#Button(this, i);
      if (i == 64) {
        newButton.onNoteOn = () => {
          newButton.on();
          cursors[curCursor].stepylen++;
        }
      } else if (i == 65) {
        newButton.onNoteOn = () => {
          newButton.on();
          cursors[curCursor].stepylen--;
        }
      }
      else if (i == 66) {
        newButton.onNoteOn = () => {
          newButton.on();
          cursors[curCursor].stepxlen--;
        }
      } else if (i == 67) {
        newButton.onNoteOn = () => {
          newButton.on();
          cursors[curCursor].stepxlen++;
        }
      }
      else {
        newButton.onNoteOn = () => {
          newButton.on();
        };
      }

      newButton.onNoteOff = () => {
          newButton.off();
      }

    }

    for(let i = 82; i < 90; ++i) {
      let newButton = this.Buttons.col[i] = new this.#Button(this, i);
      if(newButton.id == 86) { // select
        newButton.onNoteOn = () => {
          cursors.forEach((c) => { c.color = 1 });
          logg("cur: " + curCursor + " all: " + cursors );
          curCursor = curCursor == cursors.length - 1 ? 0 : curCursor + 1;
          cursors[curCursor].color = 3;
          newButton.on();
        }
        newButton.onNoteOff = () => {
          newButton.off();
        }
      }
      else {
        newButton.onNoteOn = () => {
          newButton.on();
        };
        newButton.onNoteOff = () => {
          newButton.off();
        }
      }
    }

    this.Buttons.shift = new this.#Button(this, 98);

    var lastrow;

    this.Buttons.shift.onNoteOn = () => {
      // this.Buttons.grid.forEach((b) => { b.red() });
      logg("shift?");
      lastGrid = this.Buttons.grid.map((b) => {
        if(b) {
          b.red();
          let orig = b.onNoteOn;

          b.onNoteOn = (isCursor = false) => {
            if (isCursor) return orig();
            // orig(b);
            b.green();
            let newcur = cursors[cursors.length] = new this.#Cursor(this, b.id % 8, Math.floor(b.id / 8));

            logg("scheduling updates");
            Tone.Transport.schedule((time) => {
              logg("running updates");
              newcur.updatex(time);
              newcur.updatey(time);
            }, Tone.getTransport().nextSubdivision("1m"));
          };

          return orig;
        }
      });

      lastrow = this.Buttons.row.map((b) => {
          return b.onNoteOn ? b.onNoteOn : undefined;
      });

      for (let i = 64; i < 68; ++i) {
        let btn = this.Buttons.row[i];
        switch(i) {
          case 64:
            btn.onNoteOn = () => {
              btn.on();
              cursors[curCursor].yfreqinc();
            };
            break;
          case 65:
            btn.onNoteOn = () => {
              btn.on();
              cursors[curCursor].yfreqdec();
            };
            break;
          case 66:
            btn.onNoteOn = () => {
              btn.on();
              cursors[curCursor].xfreqdec();
            };
            break;
          case 67:
            btn.onNoteOn = () => {
              btn.on();
              cursors[curCursor].xfreqinc();
            };
            break;
        }
      }
    }

    this.Buttons.shift.onNoteOff = () => {
      logg("unshift!");
      for (let i = 0; i < 64; ++i) {
        this.Buttons.grid[i].off();
        this.Buttons.grid[i].onNoteOn = lastGrid[i];
      }
      for(let i = 64; i < 68; ++i) {
        this.Buttons.row[i].onNoteOn = lastrow[i];
      }
      cursors.forEach((c) => { c.running = true });
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
          this.Buttons.row[e.data[1]];
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
  logg("hmmm?");

  WebMidi.enable(function(err) {
    if(err) {
      throw("over");
      logg("blerg", err);
    }
    else {
      logg("not blerg?");
    }

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
    };

    /* C major: 48 50 52 53 55 57 59 60
               0  2  4  5  7  9 11 12 */

    var toggled = false;
    var triggers = [];

    var apc = new APCMini(input, output);
    logg("ok go?");

  });

}

// vim: expandtab:tabstop=2:shiftwidth=2
