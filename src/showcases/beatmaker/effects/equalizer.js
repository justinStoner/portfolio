import {AudioBus} from '../components/audio-bus';
import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {EqService} from '../../../services/eq-service'
@inject(AudioBus, EventAggregator, EqService)
export class Equalizer{
  @bindable mode;
  constructor(ab, ea, eq){
    this.eq=eq;
    this.ab=ab;
    this.ea=ea;
  }
  toggleEffect(){
    this.ea.publish('toggleEQ');
    this.eq[this.mode].active=!this.eq[this.mode].active;
  }
}
