import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class Slider{
  @bindable min;
  @bindable max;
  @bindable label;
  @bindable val;
  @bindable labels;
  @bindable canvas;
  @bindable preset;
  @bindable channel;
  @bindable canvas;
  constructor(element, ea){
    this.element=element;
    this.ea=ea;
    var noUiSlider = require('nouislider');
    this.isOpen=false;
    this.octaves=[-3,-2,-1,0,1,2,3];
    this.waves=['sine', 'saw', 'sqr', 'tri'];
  }
  attached(){
      this.range=this.element.children[2];
      this.range.style.margin = '0 2px 15px 2px';


  }
  toggleSlider(e){
    console.log(e);
    if(this.isOpen){
      this.range.noUiSlider.destroy();
    }else{
      noUiSlider.create(this.range, {
       start: this.val,
       step: 1,
       behavior:'tap-drag',
       orientation:'vertical',
       direction:'rtl',
      //  pips:{
      //    mode: 'positions',
      // 	 values: [0,25,50,75,100],
      // 	 density: 8,
      //  	 stepped: true,
      //    format:wNumb({
      //      decimals:0
      //    })
      //  },
       tooltips:false,
       range: {
         'min': parseInt(this.min),
         'max': parseInt(this.max)
       }
      });
      this.range.noUiSlider.on('slide', val=>{
        this.val=val[0];
        this.change(false);
      })
      this.range.style.left=this.element.children[1].offsetLeft+50+'px';
      this.range.style.top=this.element.children[1].offsetTop-40+'px';
    }
    this.isOpen=!this.isOpen;
  }
  change(){

    if(this.channel){
      this.ea.publish(this.channel, this.val);
    }
  }
  add(){
    this.val++;
    if(this.channel){
      this.ea.publish(this.channel, this.val);
    }

  }
  minus(){
    this.val--;
    if(this.val<0){
      this.val=0;
    }
    if(this.channel){
      this.ea.publish(this.channel, this.val);
    }
  }

  // valChanged(newval, oldval){
  //   console.log(val);
  //   this.range.UiSlider.set(newval);
  //   this.change();
  // }
}
