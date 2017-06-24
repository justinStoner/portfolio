import {AudioBus} from '../components/audio-bus';
import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CompService} from '../../../services/comp-service';
@inject(AudioBus, EventAggregator, CompService)
export class Compressor{
  @bindable mode
  constructor(ab, ea, comp){
    this.comp=comp
    this.ab=ab;
    this.ea=ea;
    this.active=true;
  }
  toggleEffect(){
    this.ea.publish(`toggleCompressor${':'+this.mode}`);
    this.active=!this.active;
  }
}
