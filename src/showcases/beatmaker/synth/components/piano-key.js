import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class PianoKeyCustomElement{
  @bindable key;
  @bindable assigned;
  @bindable playing
  @bindable index;

  constructor(element, ea){
    this.element=element;
    this.ea=ea;
  }
   attached(){

   }
   play(){
     this.ea.publish('play-key', {index:this.index});
   }
   stop(){
     this.ea.publish('stop-key', {index:this.index});
   }

}
