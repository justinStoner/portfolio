import "jquery-knob";
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject, bindable} from "aurelia-framework"
@inject(Element, EventAggregator)
export class KnobCustomElement{
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
  constructor(e, ea){
    this.element=e;
    this.ea=ea;
    // if(this.labels===null){
    //   this.labels="0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
    // }
  }
  attached(){

    if(this.label==='Wave' || this.label==='Octave'){
      this.knob=new Knob(this.element.children[1], new Ui.P1());
    }else{
      this.knob=new Knob(this.element.children[1], new Ui.P2());
    }
    if(this.preset){
      this.knob.update(this.preset);
    }
    this.knob.input.onchange = e =>{
      if(this.channel){
        this.ea.publish(this.channel, this.knob.value);
      }
    }
  }
}

Ui.P1 = function() {

};

Ui.P1.prototype = Object.create(Ui.prototype);

Ui.P1.prototype.createElement = function() {
  "use strict";
  Ui.prototype.createElement.apply(this, arguments);
  this.addComponent(new Ui.Pointer({
    type: 'Circle',
    pointerWidth: 3,
    pointerHeight: this.width / 5,
    offset: this.width / 2 - this.width / 4.7 - this.width / 10
  }));

  this.addComponent(new Ui.Scale(this.merge(this.options, {
    drawScale: false,
    drawDial: true,
    radius: this.width/2.6})));

  var circle = new Ui.El.Circle(this.width / 3.3, this.width / 2, this.height / 2);
  //var circle1 = new Ui.El.Circle(this.width / 3.1, this.width / 1.95, this.height / 1.82);
  //this.el.node.appendChild(circle1.node);
  this.el.node.appendChild(circle.node);
  this.el.node.setAttribute("class", "p1");
};

Ui.P2 = function() {
};

Ui.P2.prototype = Object.create(Ui.prototype);

Ui.P2.prototype.createElement = function() {
  "use strict";
  Ui.prototype.createElement.apply(this, arguments);

  var scale=new Ui.Scale({
    drawScale: true,
    steps: this.width/2.5,
    tickWidth: 3,
    tickHeight: 9,
    type: 'Rect'

  })
  this.addComponent(scale);
  var circle = new Ui.El.Circle(this.width / 3.3, this.width / 2, this.height / 2);
  this.addComponent(new Ui.Text());
  //var circle1 = new Ui.El.Circle(this.width / 3.1, this.width / 1.95, this.height / 1.82);
  this.addComponent(new Ui.Pointer(this.merge(this.options, {
    type: 'Circle',
    pointerWidth: 3,
    pointerHeight: this.width / 5,
    offset: this.width / 2 - this.width / 4.7 - this.width / 10
  })));


  this.merge(this.options, {arcWidth: this.width / 7});
//  this.el.node.appendChild(circle1.node);
  this.el.node.appendChild(circle.node);
  this.el.node.setAttribute("class", "p2");
};
Ui.Scale.prototype.createElement = function(parentEl) {
  this.el = new Ui.El(this.width, this.height);
  this.startAngle = this.options.angleoffset || 0;
  this.options.radius || (this.options.radius = this.height / 2.5);
  this.el.create("g");
  this.el.addClassName('scale');
  if (this.options.drawScale) {
    if(!this.options.labels){
      var step = this.options.anglerange / this.options.steps;
      var end = this.options.steps + (this.options.anglerange == 360 ? 0 : 1);
      this.ticks = [];
      var Shape = this.options.type;
      for (var i = 0; i < end; i++) {
        var rect = new Shape(this.options.tickWidth, this.options.tickHeight, this.width / 2, -2);
        rect.node.setAttribute('rx', 1);
        rect.node.setAttribute('ry', 1);
        rect.rotate(this.startAngle + i * step, this.width / 2, this.height / 2);
        this.el.append(rect);
        this.ticks.push(rect);
      }
    }
  }
  this.appendTo(parentEl);
  if (this.options.drawDial) {
    this.dial();
  }
};
