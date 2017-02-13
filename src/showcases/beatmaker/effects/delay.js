export class Delay{
  constructor(){
    this.dTime=25;
    this.dFeed=50;
    this.dWet=50;
  }
  createDelay(){
    this.delay = this.audio.createDelay(5.0);
    this.feedback = this.audio.createGain();
    this.wetLevel = this.audio.createGain();
    this.delay.delayTime.value = this.dTime/100;
    this.feedback.gain.value = this.dFeed/100;
    this.wetLevel.gain.value = this.dWet/100;
  }
}
