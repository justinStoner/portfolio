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
    this.eq5=37;
    this.eq6=40;
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
