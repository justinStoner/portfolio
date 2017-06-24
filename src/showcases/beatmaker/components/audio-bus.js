import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from "aurelia-framework";
import {CompService} from '../../../services/comp-service';
@inject(EventAggregator, CompService)
export class AudioBus{
  constructor(ea, comp){
    this.ea=ea;
    this.compServ=comp;
    this.audio = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser=this.audio.createAnalyser();
    this.analyser.connect(this.audio.destination);
    this.analyser.fftSize=2048;
    this.bufferLength = this.analyser.fftSize;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.synthOut=this.audio.createGain();
    this.synthOut.gain.value=0.6;
    this.showVisualizer=false;
    this.input=this.audio.createGain();
    this.output=this.audio.createGain();
    this.synthIn=this.audio.createGain();
    this.drumsIn=this.audio.createGain();
    this.compressor=this.createCompressor('sidechain');
    this.connect();
    this.compressionOn=true;
    this.delayOn=true;
    this.eqOn=true;
    this.drumsIn.connect(this.input);
    this.input.connect(this.output);
    this.synthOut.connect(this.output)
    this.output.connect(this.analyser);
    var testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|'  + 'Opera Mini|IEMobile|Mobile' , 'i');
    this.isMobile=testExp.test(navigator.userAgent);
    console.log(this.isMobile);

    this.ea.subscribe('compAttack:sidechain', msg=>{
      this.compressor.attack.value=msg/100;
    });
    this.ea.subscribe('compRelease:sidechain', msg=>{
      this.compressor.release.value=msg/100;
    });
    this.ea.subscribe('compThresh:sidechain', msg=>{
      this.compressor.threshold.value=msg-100;
    });
    this.ea.subscribe('compKnee:sidechain', msg=>{
      this.compressor.knee.value=msg;
    });
    this.ea.subscribe('compRatio:sidechain', msg=>{
      this.compressor.ratio.value=msg;
    });
    this.ea.subscribe('toggleCompressor:sidechain', msg=>{
      this.compressionOn=!this.compressionOn;
    })


  }
  connect(){
    this.synthIn.connect(this.synthOut);
    var gain=this.audio.createGain();
    gain.gain.value=0.001;
    this.compressor.connect(gain);
    gain.connect(this.output);
  }



  createCompressor(mode){
    var comp=this.compServ[mode];
    var compressor = this.audio.createDynamicsCompressor();
    console.log(comp);
    compressor.threshold.value = comp.threshold-100;
    compressor.knee.value = comp.knee;
    compressor.ratio.value = comp.ratio;
    compressor.attack.value = comp.attack;
    compressor.release.value = comp.release;
    return compressor;
  }

}
