import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(Element, EventAggregator)
export class Slider{
  @bindable min;
  @bindable max;
  @bindable label;
  @bindable val;
  @bindable labels;
  @bindable offset;
  @bindable range;
  @bindable canvas;
  @bindable preset;
  @bindable channel;
  @bindable noslider;
  @bindable inline;
  constructor(element, ea){
    this.element=element;
    this.ea=ea;

  }
  attached(){
    if(this.noslider!==true){
      this.range=this.element.children[1];
      this.range.style.margin = '0 2px 15px 2px';
      noUiSlider.create(this.range, {
       start: this.val,
       connect: true,
       step: 1,
       behavior:'tap-drag',
       //orientation:'vertical',
       //direction:'rtl',
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
       },
       format: wNumb({
         decimals: 1
       })
      });
      this.range.noUiSlider.on('slide', val=>{
        this.val=val[0];
        this.change(false);
      })
    }
  }
  change(slider=true){
    if(slider){
      this.range.noUiSlider.set(this.val);
    }
    if(this.channel){
      this.ea.publish(this.channel, this.val);
    }
  }
  add(){
    this.val++;
    if(this.noslider!==true){
      this.range.noUiSlider.set(this.val);
    }
  }
  minus(){
    this.val--;
    if(this.val<0){
      this.val=0;
    }
    if(this.noslider!==true){
      this.range.noUiSlider.set(this.val);
    }
  }

  // valChanged(newval, oldval){
  //   console.log(val);
  //   this.range.UiSlider.set(newval);
  //   this.change();
  // }
}
