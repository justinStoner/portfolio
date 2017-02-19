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
     console.log(this.index);
     materialize.waves(this.element);
     this.ea.publish('play-key', {index:this.index});
   }
   stop(){
     this.ea.publish('stop-key', {index:this.index});
   }

}
