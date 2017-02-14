import {inject, bindable} from 'aurelia-framework';
export class Oscillator{
  @bindable wave;
  @bindable volume
  @bindable muted
  @bindable octave
  constructor(){
    this.octaves=[-3,-2,-1,0,1,2,3];
  }
}
