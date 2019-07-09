document.addEventListener('contextmenu', event => event.preventDefault());
const encoded = [];
let keyframes = [{
  r: 0,
  b: 0,
  g: 0,
  t: 0
}];
let songIn, song, fft, inColor, howTo, z1, z2, testing, testInterval, decompile, data;

function setup() {
  songIn = createFileInput(load).position(16, 16).style("color", "#ebebeb").style("z-index", 1000);
  z1 = 0;
  z2 = 1;
  createCanvas(windowWidth, windowHeight).position(0, 0).parent("#container").style("z-index", 0);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  if (!testing) {
    background(51)
  }
  if (song) {
    if (!testing) {
      stroke(235);
      strokeWeight(2)
      line(0, height * 3 / 4, width, height * 3 / 4);
      if (fft) {
        stroke(51, 128, 235);
        let use = fft.slice(floor(fft.length * z1), floor(fft.length * z2) + 1);

        function avg(use, start, amt) {
          let ret = 0;
          for (let i = 0; i < amt; i++) {
            ret += use[start + i];
          }
          return ret / amt;
        }

        let increment = Math.round(use.length / width)
        for (let i = 0; i < use.length; i += increment) {
          line(i / (use.length / width), height, i / (use.length / width), map(abs(avg(use, i, increment)), 0, 1, height, height * 3 / 4));
        }
        stroke(235)
      }
      for (let frame of keyframes) {
        strokeWeight(2)
        fill(frame.r, frame.g, frame.b);
        line(map(frame.t, song.duration() * z1 * 1000, song.duration() * z2 * 1000, 0, width), height, map(frame.t, song.duration() * z1 * 1000, song.duration() * z2 * 1000, 0, width), height * 3 / 4)
        rect(map(frame.t, song.duration() * z1 * 1000, song.duration() * z2 * 1000, 0, width), height * 3 / 4, width / 64, width / 64);
      }
      line(map(z1, 0, 1, 0, width), height * 3 / 4 * 7 / 8, map(z1, 0, 1, 0, width), height * 3 / 4 * 13 / 16)
      line(map(z2, 0, 1, 0, width), height * 3 / 4 * 7 / 8, map(z2, 0, 1, 0, width), height * 3 / 4 * 13 / 16)
      let clicky1;
      let clicky2;
      if (collidePointLine(mouseX, mouseY, map(z1, 0, 1, 0, width), height * 3 / 4 * 7 / 8, map(z1, 0, 1, 0, width), height * 3 / 4 * 13 / 16, 4) && mouseIsPressed && !clicky2) {
        clicky1 = setInterval(() => {
          if (mouseIsPressed) {
            z1 = map(mouseX, 0, width, 0, 1);
            if (z1 > z2 - 0.01) {
              z1 = z2 - 0.01
            }
            if (z1 < 0) {
              z1 = 0;
            }
          } else {
            clearInterval(clicky1)
            clicky1 = undefined
          }
        })
      }
      if (collidePointLine(mouseX, mouseY, map(z2, 0, 1, 0, width), height * 3 / 4 * 7 / 8, map(z2, 0, 1, 0, width), height * 3 / 4 * 13 / 16, 4) && mouseIsPressed && !clicky1) {
        clicky2 = setInterval(() => {
          if (mouseIsPressed) {
            z2 = map(mouseX, 0, width, 0, 1);
            if (z2 < z1 + 0.01) {
              z2 = z1 + 0.01
            }
            if (z2 > 1) {
              z2 = 1;
            }
          } else {
            clearInterval(clicky2)
            clicky2 = undefined
          }
        })
      }
    }
  }
}

function load(file) {
  song = loadSound(file, () => {
    removeElements();
    inColor = createInput("", "color").position(16, 16).id("color-picker");
    test = createButton("Test").position(90, 16).mousePressed(test);
    stoptest = createButton("Stop Test").position(144, 16).mousePressed(stopTest)
    howTo = createButton("How To Use").position(230, 16).mousePressed(() => {
      window.open("https://github.com/F4Tornado/color-encoder#how-to-use")
    })
    copy = createButton("Copy code").position(330, 16).mousePressed(() => {
      generate()
      let text = createElement("textarea")
      text.value(encoded.toString());
      text.elt.select()
      document.execCommand("copy")
      text.remove()
    })
    decompile = createElement("textarea").position(420, 16).attribute("onchange", "loadData()");
    decompile.elt.placeholder = "Load data"
    fft = song.getPeaks(width * 64);
  });

}

function mousePressed() {
  if (mouseY > height * 3 / 4 && mouseButton == LEFT) {
    c = hexToRGB(inColor.value());
    keyframes.push({
      r: c[0],
      g: c[1],
      b: c[2],
      t: floor((mouseX / width) * song.duration() * 1000 * (z2 - z1) + z1 * song.duration() * 1000)
    })
    console.log(keyframes)
  } else if (mouseButton == RIGHT) {
    console.log("yee")
    for (var i = keyframes.length - 1; i >= 0; i--) {
      if (collidePointRect(mouseX, mouseY, map(keyframes[i].t, song.duration() * z1 * 1000, song.duration() * z2 * 1000, 0, width) - width / 128, height * 3 / 4 - width / 128, width / 64, width / 64)) {
        keyframes.splice(i, 1);
      }
    }
  }
}

const generate = () => {
  encoded.splice(0, encoded.length);
  keyframes.sort((a, b) => {
    return a.t - b.t
  })
  for (let i = 0; i < keyframes.length; i++) {
    let r = keyframes[i].r;
    let g = keyframes[i].g;
    let b = keyframes[i].b;
    let w;
    w = r;
    if (g < w) {
      w = g;
    }
    if (b < w) {
      w = b;
    }
    encoded.push(r - w);
    encoded.push(g - w);
    encoded.push(b - w);
    encoded.push(w);
    if (keyframes[i + 1]) {
      encoded.push(keyframes[i + 1].t - keyframes[i].t)
    } else {
      encoded.push((song.duration() * 1000) - keyframes[i].t)
    }
    console.log(encoded)
  }
}

function test() {
  testing = true;
  let tempKeyframes = JSON.parse(JSON.stringify(keyframes));
  tempKeyframes.sort((a, b) => {
    return a.t - b.t;
  })
  song.play(0, 1, 1, song.duration() * z1)
  let startTime = song.duration() * z1 * 1000;
  let now = performance.now();

  testInterval = setInterval((tempKeyframes) => {
    for (let i = 0; i < tempKeyframes.length; i++) {
      let newest = 0;
      if (tempKeyframes[i].t + now - startTime <= performance.now()) {
        newest = i;
      }
      tempKeyframes.splice(0, newest)
      background(tempKeyframes[0].r, tempKeyframes[0].g, tempKeyframes[0].b)
    }
  }, 1000 / 30, tempKeyframes)
}

function stopTest() {
  testing = false;
  song.stop();
  clearInterval(testInterval)
}

function loadData() {
  data = decompile.value().split(",");
  console.log(data)
  let ret = [];
  let totalTime = 0;
  for (let i = 0; i < data.length; i += 5) {
    let w = parseInt(data[i + 3]);

    let r = parseInt(data[i + 0]) + w;
    let g = parseInt(data[i + 1]) + w;
    let b = parseInt(data[i + 2]) + w;
    console.log(r, g, b)

    ret.push({
      r: r,
      g: g,
      b: b,
      t: totalTime
    })

    totalTime += parseInt(data[i + 4]);
  }
  keyframes = ret;
  decompile.remove()
}

function hexToRGB(hex) {
  let c = color(hex);
  console.log(c);
  return [c.levels[0], c.levels[1], c.levels[2]]
}

window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = `Sure you want to leave? Your progress may get lost`;

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});