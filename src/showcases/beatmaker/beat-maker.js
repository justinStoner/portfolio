import {AudioBus} from './components/audio-bus';
import {inject} from 'aurelia-framework';
@inject(AudioBus)
export class BeatMaker{
  constructor(ab){
    this.ab=ab;
  }
  attached(){
    $('ul.showcase-tabs').tabs();
  }

}
