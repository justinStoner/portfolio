import {inject, bindable} from 'aurelia-framework';
export class Oscillator{
  @bindable wave;
  @bindable volume;
  @bindable type;
  @bindable octave;
  @bindable index;
  constructor(){

  }
}
