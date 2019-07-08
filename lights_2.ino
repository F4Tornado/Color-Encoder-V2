int w = 6; //White pin
int r = 7; //Red pin
int g = 9; //Green pin
int b = 8; //Blue pin
int brightness = 100;
//r, g, b, w, time
//int seq[] = {0,0,0,0,28933,255,0,0,0,57569,0,137,211,22,101714,54,0,121,67,21775,0,0,0,0,19985,191,64,0,64,40865,0,128,128,0,41461,0,0,255,0,20880,64,0,128,0,10142.25};
//int step = 0;

void setup() {
  pinMode(w, OUTPUT);
  pinMode(r, OUTPUT);
  pinMode(g, OUTPUT);
  pinMode(b, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  writeColor(255, 0, 0, 0);
  Serial.println("r");
  delay(500);
  writeColor(0, 255, 0, 0);
  Serial.println("g");
  delay(500);
  writeColor(0, 0, 255, 0);
  Serial.println("b");
  delay(500);
  writeColor(0, 0, 0, 255);
  Serial.println("w");
  delay(500);
  writeColor(0, 0, 0, 0);
  Serial.println("2");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(250);
  digitalWrite(LED_BUILTIN, LOW);
  delay(750);
  Serial.println("1");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(250);
  digitalWrite(LED_BUILTIN, LOW);
  delay(750);
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.println("Start");
}

void loop() {
//  if (step < (sizeof(seq) / sizeof(int))/5.0) {
//    writeColor(seq[0+(step*5)], seq[1+(step*5)], seq[2+(step*5)], seq[3+(step*5)]);
//    delay((int)seq[4+(step*5)]);
//    step = step + 1;
//  } else {
//    writeColor(0, 0, 0, 255);  
//  }
  if (Serial.available() >=4) {
    int r = Serial.read();
    Serial.println(r*2);
    int g = Serial.read();
    Serial.println(g*2);
    int b = Serial.read();
    Serial.println(b*2);
    int w = Serial.read();
    Serial.println(w*2);

    writeColor(r, g, b, w);
  }
//  writeColor(sin(millis()/2000.0)*255, sin(millis()/4000.0)*255, sin(millis()/6000.0)*255, 0);
//  writeColor(255, 255, 0, 0);
}

void writeColor(int ri, int gi, int bi, int wi) {
  analogWrite(r, (int)ri*(brightness/100.0));
  analogWrite(g, (int)gi*(brightness/200.0));
  analogWrite(b, (int)bi*(brightness/200.0));
  analogWrite(w, (int)wi*(brightness/100.0));
}
