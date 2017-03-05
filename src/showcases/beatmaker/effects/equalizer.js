import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(AudioBus, EventAggregator)
export class Equalizer{
  constructor(ab, ea){
    this.eq1=0;
    this.eq2=0;
    this.eq3=0;
    this.eq4=0;
    this.eq5=0;
    this.eq6=0;
    this.ab=ab;
    this.ea=ea;
    this.active=true;
    //min, max: -40, 40
  }
  toggleEffect(){
    this.ea.publish('toggleEQ');
    this.active=!this.active;
  }
}
