# Color Encoder V2

## What's different?
1. The color editor has been optimized and improved
2. I recently learned that arduino timings can't be trusted, and will drift over time, meaning the lights will get out of sync. I changed it to use Serial, so the computer controls all the timings.
3. Now that a computer is controlling the lights, it can control the audio as well, so you don't have to start the music manually!

## How do I use it?

Feel free to raise an issue if anything goes wrong.

### Set up the lights
1. Wire up the lights, you can use the instructions [here](https://www.makeuseof.com/tag/connect-led-light-strips-arduino/) to make the lights, you will have to add a color channel for the white though
2. Run lights_2.ino on the arduino, this will test all the color channels, and wait for a Serial signal, but you haven't done that yet, so it will just go through the colors. If this doesn't work, the program may be outputting to the wrong pins. If so, you can change them in the lights_2.ino file
3. Download mplayer.exe, index.js, code.txt, Music.mp3, package.json, and package_lock.json into a folder. This is the stuff that will control the lights.
4. Go to a text editor, open index.js, and at the top of the file, replace "COM1" with the serial port of your arduino. You can find this in the arduino IDE by going to tools->Port: "PORT (board name)"
5. Download node.js if you haven't already
6. Open a command line window, use the cd command to navigate to the folder with the files you downloaded, and run "npm install serialport", and "npm install play-sound" This will install the dependencies required.
7. Make sure your arduino is plugged in, and in your command line window, run "node index.js". If all has gone well, you should see the lights go through each channel, stop a while, and music will play along with a preprogrammed sequence of lights.

### Program the lights
1. Go to the website listed at the top of the github page
2. Select the piece of music you want to use from your computer, and wait a bit
3. At the top there is a color selector, you can use that to choose the color for the lights. You can click on the waveform to set the lights to be that color at that time in the music. If you make a mistake, you can right click a box to delete it. You can use the two lines on the side to zoom in to the waveform. You can press the test button to see what your sequence looks like beforehand, starting from the beginning of the on screen part of the waveform. You can press stop test to stop.
4. When you're done programming the lights, press "copy code", then open the code.txt file, delete it's contents, and paste. Then replace Music.mp3 with your song. Make sure your song is in mp3 format, and named "Music"; or you can change the name it looks for in the index.js.
5. Make sure your arduino is plugged in, and open a command line window, cd to the folder, and run "node index.js". If all has gone well, you should see the test sequence, and then your music and light sequence playing.
