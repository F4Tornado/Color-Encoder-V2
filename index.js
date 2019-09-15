const arduinoPort = "COM1"

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const player = require('play-sound')({
  player: "mplayer.exe"
});
const fs = require("fs")

const port = new SerialPort(arduinoPort, {
  baudRate: 9600
});
const parser = port.pipe(new Readline({
  delimiter: '\n'
}));

let code;
fs.readFile("code.txt", "UTF-8", (err, data) => {
  code = data.split(",");
});

// Read the port data
port.on("open", () => {
  console.log("\x1b[35m", 'serial port open');
});

let msgs = 0;

parser.on('data', data => {
  msgs++;
  console.log('\x1b[34m', data);
  if (msgs == 7) {
    player.play("./Music.wav", {
      timeout: 500
    }, function (err) {
      if (err) throw err;
    })
    setTimeout(() => {
      console.log("\x1b[35m", "starting")

      function run(step) {
        console.log("\x1b[35m", code.length / 5)
        let r = code[step * 5];
        let g = code[step * 5 + 1];
        let b = code[step * 5 + 2];
        let w = code[step * 5 + 3];
        let t = code[step * 5 + 4];
        writeColor(r, g, b, w)
        if (step < code.length / 5) {
          setTimeout(run, t, step + 1)
        } else {
          writeColor(0, 0, 0, 0)
        }
      }
      run(0)
    }, 500);
  }
});

function writeColor(r, g, b, w) {
  port.write(String.fromCharCode(Math.floor(r / 2)));
  port.write(String.fromCharCode(Math.floor(g / 2)));
  port.write(String.fromCharCode(Math.floor(b / 2)));
  port.write(String.fromCharCode(Math.floor(w / 2)));
}