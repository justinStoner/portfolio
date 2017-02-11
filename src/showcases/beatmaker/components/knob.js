import $ from "jquery";
import "jquery-knob";
import {inject, bindable} from "aurelia-framework"
@inject(Element)
export class KnobCustomElement{
  @bindable min;
  @bindable max;
  @bindable label;
  @bindable val;
  constructor(e){
    this.element=e;
  }
  attached(){
    console.log(this.element.children);
    $(this.element.children[0]).knob({
      'change':(v)=>{console.log(this.val=v)}
    });
    //this.element.children[1].addEventListener('changed')
  }
}
