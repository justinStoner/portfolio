import {EventAggregator} from 'aurelia-event-aggregator';
import {inject, bindable} from 'aurelia-framework';
import {AudioBus} from './audio-bus'
import 'jquery';
@inject(EventAggregator, Element, AudioBus)
export class SoundWave{
  @bindable canvasId;
  @bindable background;
  @bindable asHeader;
  @bindable mode;
  constructor(ea, element, audiobus){
    this.ea=ea;
    this.element=element;
    this.x=0;
    this.y;
    this.v;
    this.animId;
    this.ab=audiobus;
    this.ea.subscribe('resize', ()=>{
      var height, width;
      width=$(this.bgEl).width();
      height=$(this.bgEl).height();
      if(this.asHeader){
        width+=32;
        this.bgColor="transparent";
        this.fgColor="#fff";
        this.element.style.marginLeft='-16px';
        this.element.style.marginRight='-16px';
        this.ab=this.audiobus;
      }
      this.canvas.width=width;
      this.canvas.height=height;
      this.element.style.marginTop=height * -1 + 'px';
    });
  }

  attached(){
    this.bgColor="#2196f3";
    this.fgColor="#69f0ae";
    this.canvas=this.element.children[0];

    this.canvasCtx = this.canvas.getContext('2d');
    this.bgEl=document.getElementById(this.canvasId);
    var height, width;
    width=$(this.bgEl).width();
    height=$(this.bgEl).height();
    if(this.asHeader){
      width+=32;
      this.bgColor="transparent";
      this.fgColor="#fff";
      this.element.style.marginLeft='-16px';
      this.element.style.marginRight='-16px';
      this.ab=this.audiobus;
    }

    this.element.style.marginTop=height * -1 + 'px';
    this.canvas.width=width;
    this.canvas.height=height;
    this.sliceWidth = this.canvas.width * 1.0 / this.ab.bufferLength;
    if(this.mode==='synth'){
      this.analyser=this.ab.synthAnalyser;
    }else if(this.mode==='drums'){
      this.analyser=this.ab.drumAnalyser;
    }
    this.draw();
  }

  draw(){
    this.analyser.getByteTimeDomainData(this.ab.dataArray);
    this.canvasCtx.fillStyle = this.bgColor;
    if(this.asHeader){
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }else{
      this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.canvasCtx.lineWidth = 1;
    this.canvasCtx.strokeStyle = this.fgColor;
    this.canvasCtx.beginPath();
    this.sliceWidth = this.canvas.width * 1.0 / this.ab.bufferLength;
    this.x = 0;
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
    this.animId = requestAnimationFrame(this.draw.bind(this));
  }
  detached(){
    cancelAnimationFrame(this.animId);
  }
}
