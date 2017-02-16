import {inject, bindable} from 'aurelia-framework';
export class Oscillator{
  @bindable wave;
  @bindable volume;
  @bindable type;
  @bindable octave;
  @bindable freq;
  @bindable detune;
  @bindable gain;
  @bindable osc1;
  @bindable osc2;
  @bindable modtype;
  @bindable index;
  constructor(){

  }
}
