import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(AudioBus, EventAggregator)
export class Compressor{
  constructor(ab, ea){
    this.ab=ab;
    this.ea=ea;
    this.attack=0.5;
    this.release=0.5;
    this.threshold=48;
    this.knee=9;
    this.ratio=20;
    this.active=true;
  }
  toggleEffect(){
    this.ea.publish('toggleCompressor');
    this.active=!this.active;
  }
}
