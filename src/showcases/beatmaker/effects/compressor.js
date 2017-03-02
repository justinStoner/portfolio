import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
@inject(AudioBus)
export class Compressor{
  constructor(ab){
    this.ab=ab;
  }
}
