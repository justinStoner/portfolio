import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(AudioBus, EventAggregator)
export class Compressor{
  constructor(ab, ea){
    this.ab=ab;
    this.ea=ea;
    this.attack=25;
    this.release=25;
    this.threshold=50;
    this.knee=40;
    this.ratio=11+1;
    this.active=true;
  }
  toggleEffect(){
    this.ea.publish('toggleCompressor');
    this.active=!this.active;
  }
}
