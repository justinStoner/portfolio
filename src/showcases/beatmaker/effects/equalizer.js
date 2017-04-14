import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(AudioBus, EventAggregator)
export class Equalizer{
  constructor(ab, ea){
    this.eq1=40;
    this.eq2=44;
    this.eq3=35;
    this.eq4=35;
    this.eq5=30;
    this.eq6=40;
    this.ab=ab;
    this.ea=ea;
    this.active=true;
  }
  toggleEffect(){
    this.ea.publish('toggleEQ');
    this.active=!this.active;
  }
}
