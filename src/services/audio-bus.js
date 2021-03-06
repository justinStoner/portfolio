// import {EventAggregator} from 'aurelia-event-aggregator';
// import {inject} from "aurelia-framework";
// import {CompService} from './comp-service';
// @inject(EventAggregator, CompService)
// export class AudioBus{
//   constructor(ea, compservice){
//     this.ea=ea;
//     this.audio = new (window.AudioContext || window.webkitAudioContext)();
//     this.analyser=this.audio.createAnalyser();
//     this.analyser.connect(this.audio.destination);
//     this.analyser.fftSize=2048;
//     this.bufferLength = this.analyser.fftSize;
//     this.dataArray = new Uint8Array(this.bufferLength);
//     this.synthOut=this.audio.createGain();
//     this.synthOut.gain.value=0.6;
//     this.input=this.audio.createGain();
//     this.output=this.audio.createGain();
//     this.synthIn=this.audio.createGain();
//     this.drumsIn=this.audio.createGain();
//     this.createEq();
//     this.createDelay();
//     this.compressor=this.createCompressor('sidechain');
//     this.connect();
//     this.compressionOn=true;
//     this.delayOn=true;
//     this.eqOn=true;
//     this.drumsIn.connect(this.input);
//     this.input.connect(this.output);
//     this.synthOut.connect(this.output)
//     this.output.connect(this.analyser);
//     this.compServ=compservice;
//     this.ea.subscribe('eq1', msg=>{
//       this.eq80.gain.value=msg-40;
//     });
//     this.ea.subscribe('eq2', msg=>{
//       this.eq350.gain.value=msg-40;
//     });
//     this.ea.subscribe('eq3', msg=>{
//       this.eq720.gain.value=msg-40;
//     });
//     this.ea.subscribe('eq4', msg=>{
//       this.eq16k.gain.value=msg-40;
//     });
//     this.ea.subscribe('eq5', msg=>{
//       this.eq5k.gain.value=msg-40;
//     });
//     this.ea.subscribe('eq6', msg=>{
//       this.eq10k.gain.value=msg-40;
//     });
//     this.ea.subscribe('delayTime', msg=>{
//       this.delay.delayTime.value=msg/100
//     });
//     this.ea.subscribe('delayFeedback', msg=>{
//       this.feedback.gain.value=msg/100;
//     });
//     this.ea.subscribe('delayWet', msg=>{
//       this.wetLevel.gain.value=msg/100;
//     });
//     this.ea.subscribe('compAttack', msg=>{
//       this.compressor.attack.value=msg/100;
//     });
//     this.ea.subscribe('compRelease', msg=>{
//       this.compressor.release.value=msg/100;
//     });
//     this.ea.subscribe('compThresh', msg=>{
//       this.compressor.threshold.value=msg-100;
//     });
//     this.ea.subscribe('compKnee', msg=>{
//       this.compressor.knee.value=msg;
//     });
//     this.ea.subscribe('compRatio', msg=>{
//       this.compressor.ratio.value=msg;
//     });
//     this.ea.subscribe('toggleCompressor', msg=>{
//       this.compressionOn=!this.compressionOn;
//     })
//     this.ea.subscribe('toggleDelay', msg=>{
//       console.log(this.delayOn);
//       if(this.delayOn){
//         this.dOutput.disconnect();
//         if(this.eqOn){
//           this.eq10k.disconnect();
//           this.eq10k.connect(this.synthOut)
//         }else{
//           this.synthIn.disconnect();
//           this.synthIn.connect(this.synthOut);
//         }
//         this.delayOn=false;
//       }else{
//         if(this.eqOn){
//           this.eq10k.disconnect();
//           this.eq10k.connect(this.dInput);
//         }else{
//           this.synthIn.disconnect();
//           this.synthIn.connect(this.dInput);
//         }
//         this.dOutput.connect(this.synthOut);
//         this.delayOn=true;
//       }
//     })
//     this.ea.subscribe('toggleEQ', msg=>{
//       console.log(this.eqOn);
//       if(this.eqOn){
//         this.eq10k.disconnect();
//         this.synthIn.disconnect();
//         if(this.delayOn){
//           this.synthIn.connect(this.dInput);
//         }else{
//           this.synthIn.connect(this.synthOut);
//         }
//         this.eqOn=false;
//       }else{
//         this.synthIn.disconnect();
//         if(this.delayOn){
//           this.synthIn.connect(this.eq80);
//           this.eq10k.connect(this.dInput);
//         }else{
//           this.synthIn.connect(this.eq80);
//           this.eq10k.connect(this.synthOut);
//         }
//         this.eqOn=true;
//       }
//     })
//
//   }
//   connect(){
//     this.synthIn.connect(this.eq80);
//     this.eq80.connect(this.eq350);
//     this.eq350.connect(this.eq720);
//     this.eq720.connect(this.eq16k);
//     this.eq16k.connect(this.eq5k);
//     this.eq5k.connect(this.eq10k);
//     this.eq10k.connect(this.dInput);
//
//     this.dInput.connect(this.delay);
//     this.dInput.connect(this.dOutput);
//     this.delay.connect(this.feedback);
//     this.delay.connect(this.wetLevel);
//     this.feedback.connect(this.delay);
//     this.wetLevel.connect(this.dOutput);
//     this.dOutput.connect(this.synthOut);
//
//     var gain=this.audio.createGain();
//     gain.gain.value=0.001;
//     this.compressor.connect(gain);
//     gain.connect(this.output);
//   }
//
//   createEq(){
//     this.eq80=this.audio.createBiquadFilter();
//     this.eq350=this.audio.createBiquadFilter();
//     this.eq720=this.audio.createBiquadFilter();
//     this.eq16k=this.audio.createBiquadFilter();
//     this.eq5k=this.audio.createBiquadFilter();
//     this.eq10k=this.audio.createBiquadFilter();
//     this.eq80.frequency.value=80;
//     this.eq80.type="lowshelf";
//     this.eq80.gain.value=0;
//     this.eq350.frequency.value=350;
//     this.eq350.type="peaking";
//     this.eq350.gain.value=4;
//     this.eq720.frequency.value=720;
//     this.eq720.type="peaking";
//     this.eq720.gain.value=-5;
//     this.eq16k.frequency.value=1600;
//     this.eq16k.type="peaking";
//     this.eq16k.gain.value=-5;
//     this.eq5k.frequency.value=5000;
//     this.eq5k.type="peaking";
//     this.eq5k.gain.value=-10;
//     this.eq10k.frequency.value=10000;
//     this.eq10k.type="highshelf";
//     this.eq10k.gain.value=0;
//   }
//
//   createDelay(){
//     this.dInput=this.audio.createGain();
//     this.dOutput=this.audio.createGain();
//     this.delay = this.audio.createDelay(5.0);
//     this.feedback = this.audio.createGain();
//     this.wetLevel = this.audio.createGain();
//     this.delay.delayTime.value = 0.50;
//     this.feedback.gain.value = 0.15;
//     this.wetLevel.gain.value = 0.25;
//   }
//
//   createCompressor(mode){
//     var comp=this.compServ[mode];
//     var compressor = this.audio.createDynamicsCompressor();
//     console.log(comp);
//     compressor.threshold.value = comp.threshold-100;
//     compressor.knee.value = comp.knee;
//     compressor.ratio.value = comp.ratio;
//     compressor.attack.value = comp.attack;
//     compressor.release.value = comp.release;
//     return compressor;
//   }
//
// }
