import {EventAggregator} from 'aurelia-event-aggregator';
import {inject, bindable} from 'aurelia-framework';
@inject(EventAggregator, Element)
export class SoundWave{
  @bindable ab;
  @bindable canvasId;
  @bindable background;
  constructor(ea, element){
    this.ea=ea;
    this.element=element;
    this.x=0;
    this.y;
    this.v;
    this.animId;
    this.ea.subscribe('resize', ()=>{
      this.canvas.width=$(this.bgEl).width();
      this.canvas.height=$(this.bgEl).height();
      this.element.style.marginTop=$(this.bgEl).height() * -1 + 'px';
    });
  }
  attached(){
    this.bgColor="#2196f3";
    this.fgColor="#69f0ae";
    console.log(this.canvasId);
    this.canvas=this.element.children[0];

    this.canvasCtx = this.canvas.getContext('2d');
    this.bgEl=document.getElementById(this.canvasId);
    var width=$(this.bgEl).width();
    var height=$(this.bgEl).height();
    this.element.style.marginTop=height * -1 + 'px';
    console.log(this.element.style);
    this.canvas.width=width;
    this.canvas.height=height;
    this.sliceWidth = this.canvas.width * 1.0 / this.ab.bufferLength;
    this.draw();
  }
  draw(){

    this.ab.analyser.getByteTimeDomainData(this.ab.dataArray);
    this.canvasCtx.fillStyle = this.bgColor;
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.lineWidth = 1;
    this.canvasCtx.strokeStyle = this.fgColor;
    this.canvasCtx.beginPath();
    this.sliceWidth = this.canvas.width * 1.0 / this.ab.bufferLength;

    this.x = 0;
    var y,v;
    for(var i = 0; i < this.ab.bufferLength; i++) {
      this.v = this.ab.dataArray[i] / 128.0;
      this.y = this.v * this.canvas.height/2;
      if(i === 0) {
        this.canvasCtx.moveTo(this.x, this.y);
      } else {
        this.canvasCtx.lineTo(this.x, this.y);
      }
      this.x += this.sliceWidth;
    }
    this.canvasCtx.lineTo(this.canvas.width, this.canvas.height/2);
    this.canvasCtx.stroke();
    //this.bgEl.style.background='url('+this.canvas.toDataURL('image/jpeg')+') no-repeat 100% 100%';
    this.animId = requestAnimationFrame(this.draw.bind(this));
  }
}
