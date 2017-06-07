import {AudioBus} from '../components/audio-bus';
import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DelayService} from '../../../services/delay-service';
@inject(AudioBus, EventAggregator, DelayService)
export class Delay{
  @bindable mode;
  constructor(ab, ea, ds){
    this.ab=ab;
    this.ea=ea;
    this.ds=ds
  }
  toggleEffect(){
    this.ea.publish('toggleDelay');
    this.ds[this.mode].active=!this.ds[this.mode].active;
  }
  attached(){

  }
}
