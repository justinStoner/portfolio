import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(AudioBus, EventAggregator)
export class Compressor{
  constructor(ab, ea){
    this.ab=ab;
    this.ea=ea;
    this.attack=0.1;
    this.release=0.1;
    this.threshold=55;
    this.knee=28;
    this.ratio=4;
    this.active=true;
  }
  toggleEffect(){
    this.ea.publish('toggleCompressor');
    this.active=!this.active;
  }
}
