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
      'change':(v)=>{console.log(this.val=v)},
      'displayPrevious':true,
      'draw':function () {
                this.cursorExt = 0.3;

                var a = this.arc(this.cv),
                pa,
                r = 1,
                sx=2,
                sy=2;
                this.g.lineWidth = this.lineWidth;
                console.log(this);
                this.$div[0].lastChild.style.marginLeft-=sy;
                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.shadowColor='transparent';
                    this.g.arc(this.xy-sx, this.xy-sy, this.radius-(sx+sy), pa.s, pa.e, pa.d);
                    this.g.stroke();
                }
                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.bgColor : this.bgColor ;
                this.g.arc(this.xy-sx, this.xy-sy, this.radius-(sx+sy), 0, 2*Math.PI, a.d);
                this.g.shadowColor='rgba(0, 0, 0, 0.15)';
                this.g.shadowBlur = 2;
                this.g.shadowOffsetX = sx;
                this.g.shadowOffsetY = sy;
                this.g.stroke();

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.shadowColor='transparent';
                this.g.arc(this.xy-sx, this.xy-sy, this.radius-(sx+sy), a.s, a.e, a.d);
                this.g.stroke();

                return false;

        }
    });
    //this.element.children[1].addEventListener('changed')
  }
}
