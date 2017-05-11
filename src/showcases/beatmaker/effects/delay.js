import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator'
@inject(AudioBus, EventAggregator)
export class Delay{
  constructor(ab, ea){
    this.ab=ab;
    this.ea=ea;
    this.dTime=75;
    this.dFeed=50;
    this.dWet=50;
    this.active=true;
  }
  toggleEffect(){
    this.ea.publish('toggleDelay');
    this.active=!this.active;
  }
  attached(){
    
  }
}
