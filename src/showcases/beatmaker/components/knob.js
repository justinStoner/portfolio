import "jquery-knob";
console.log(Knob);
import {inject, bindable} from "aurelia-framework"
@inject(Element)
export class KnobCustomElement{
  @bindable min;
  @bindable max;
  @bindable label;
  @bindable val;
  @bindable labels;
  @bindable offset;
  @bindable range;
  constructor(e){
    this.element=e;
    if(this.labels===null){
      this.labels="0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
    }
  }
  attached(){
    console.log(this.element.children);
    this.knob=new Knob(this.element.children[1], new Ui.P1());
    console.log(this.knob);
    this.knob.input.onchange = e =>{
      console.log(e);
    }
  }
}
// class P1 extends Ui{
//   constructor(){
//     super()
//   }
//   createElement(){
//     "use strict";
//     Ui.createElement.apply(this, arguments);
//     this.addComponent(new Ui.Arc({
//       arcWidth:this.width / 10
//     }));
//     this.addComponent(new Ui.Pointer(this.merge(this.options, {
//       type: 'Rect',
//       pointerWidth: this.width / 10
//     })));
//     this.merge(this.options, {arcWidth: this.width / 10});
//     var arc = new Ui.El.Arc(this.options);
//     arc.setAngle(this.options.anglerange);
//     this.el.node.appendChild(arc.node);
//     this.el.node.setAttribute("class", "P1");
//   }
// }
Ui.P1 = function() {

};

Ui.P1.prototype = Object.create(Ui.prototype);

Ui.P1.prototype.createElement = function() {
  "use strict";
  Ui.prototype.createElement.apply(this, arguments);
  this.addComponent(new Ui.Pointer({
    type: 'Rect',
    pointerWidth: 3,
    pointerHeight: this.width / 4,
    offset: this.width / 2 - this.width / 3.3 - this.width / 10
  }));

  this.addComponent(new Ui.Scale(this.merge(this.options, {
    drawScale: false,
    drawDial: true,
    radius: this.width/2.6})));

  var circle = new Ui.El.Circle(this.width / 3.3, this.width / 2, this.height / 2);
  this.el.node.appendChild(circle.node);
  this.el.node.setAttribute("class", "p1");
};
