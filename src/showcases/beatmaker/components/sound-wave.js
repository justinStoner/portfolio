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

    this.ea.subscribe('resize', ()=>{
      if(this.background){
        this.canvas.width=$('.page-host').width();
        this.canvas.height=$('.page-host').height();
      }else{
        this.canvas.width=$('#'+this.canvasId).width();
      }
    });
  }
  attached(){
    if(this.background){
      this.bgColor="#eee";
      this.fgColor="#2196f3";
    }else{
      this.bgColor="#2196f3";
      this.fgColor="#fff";
    }
    console.log(this.canvasId);
    this.canvas=this.element.children[0];
    this.canvasCtx = this.canvas.getContext('2d');

    if(this.background){
      this.canvas.width=$('.page-host').width();
      this.canvas.height=$('.page-host').height();
    }else{
      this.canvas.width=$('#'+this.canvasId).width();
    }
    this.draw();
  }
  draw(){
    var drawVisual = requestAnimationFrame(this.draw.bind(this));
    this.ab.analyser.getByteTimeDomainData(this.ab.dataArray);
    this.canvasCtx.fillStyle = this.bgColor;
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = this.fgColor;
    this.canvasCtx.beginPath();

    var sliceWidth = this.canvas.width * 1.0 / this.ab.bufferLength;
    var x = 0;

    for(var i = 0; i < this.ab.bufferLength; i++) {

      var v = this.ab.dataArray[i] / 128.0;
      var y = v * this.canvas.height/2;
      if(i === 0) {
        this.canvasCtx.moveTo(x, y);
      } else {
        this.canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    this.canvasCtx.lineTo(this.canvas.width, this.canvas.height/2);
    this.canvasCtx.stroke();
  }
}
