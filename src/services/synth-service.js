import {inject} from 'aurelia-framework';
import {AudioBus} from '../showcases/beatmaker/components/audio-bus';
@inject(AudioBus)
export class SynthService{
  constructor(ab){
    this.ab=ab;
  }
}
