import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
@inject(AudioBus)
export class Delay{
  constructor(ab){
    this.ab=ab;
    this.dTime=75;
    this.dFeed=50;
    this.dWet=50;
  }
  // createDelay(){
  //   this.input=this.ab.audio.createGain();
  //   this.output=this.ab.audio.createGain();
  //   this.delay = this.audio.createDelay(5.0);
  //   this.feedback = this.ab.audio.createGain();
  //   this.wetLevel = this.ab.audio.createGain();
  //   this.delay.delayTime.value = this.dTime/100;
  //   this.feedback.gain.value = this.dFeed/100;
  //   this.wetLevel.gain.value = this.dWet/100;
  // }
}
