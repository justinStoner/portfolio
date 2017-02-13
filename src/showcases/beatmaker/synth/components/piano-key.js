import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {Piano} from '../piano';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(Element, Piano, EventAggregator)
export class PianoKeyCustomElement{
  @bindable key;
  @bindable assigned;
  @bindable index;

  constructor(element, piano, ea){
    this.element=element;
    this.ea=ea;
  }
   attached(){

   }
   play(){
     this.ea.publish('play-note', {index:this.index});
   }
   stop(){
     this.ea.publish('stop-note', {index:this.index});
   }

}
