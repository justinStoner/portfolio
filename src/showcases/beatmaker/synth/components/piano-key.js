import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {Piano} from '../piano';
import {AudioBus} from '../../components/audio-bus';
@inject(Element, Piano, AudioBus)
export class PianoKeyCustomElement{
  @bindable key;
  @bindable assigned;
  @bindable num;

  constructor(element, piano, ab){
    this.element=element;
    this.audio=ab.audio;
    this.piano=piano;
    this.ab=ab;
    this.currentOsc;
    this.isPlaying=false;
  }
   attached(){

     //this.key.g1.connect(this.ab.audio.destination);

       this.piano.notes[this.num].element=this.element;
       //this.piano.notes[this.num].index=this.num;

     //console.log(this.num);
     this.element.addEventListener('play', this.playKey.bind(this));
     this.element.addEventListener('stop', this.stopKey.bind(this));
   }
   playKey(e){
      if(this.isPlaying==false){
       console.log(this.piano.octave3);
       this.g1=this.ab.audio.createGain();
       this.g2=this.ab.audio.createGain();
       this.g3=this.ab.audio.createGain();
       this.o1=this.ab.audio.createOscillator();
       if(this.piano.octave1==0){
         this.o1.frequency.value=this.key.hz;
         console.log(true);
       }else if (this.piano.octave1>0){
         this.o1.frequency.value=this.key.hz * 2*this.piano.octave1;
         console.log(false);
       }else{
         this.o1.frequency.value=this.key.hz * 2/Math.abs(this.piano.octave1);
         console.log(false);
       }
       this.o1.type=this.piano.w1;
       this.o1.connect(this.g1);
       this.o2=this.ab.audio.createOscillator();
       if(this.piano.octave2==0){
         this.o2.frequency.value=this.key.hz;
         console.log(true);
       }else if (this.piano.octave2>0){
         this.o2.frequency.value=this.key.hz * 2*this.piano.octave2;
         console.log(false);
       }else{
         this.o2.frequency.value=this.key.hz * 2/Math.abs(this.piano.octave2);
         console.log(false);
       }
       this.o2.type=this.piano.w2;
       this.o2.connect(this.g2);
       this.o3=this.ab.audio.createOscillator();
         if(this.piano.octave3==0){
           this.o3.frequency.value=this.key.hz;
           console.log(true);
         }else if (this.piano.octave3>0){
           this.o3.frequency.value=this.key.hz * 2*this.piano.octave3;
           console.log(false);
         }else{
           this.o3.frequency.value=this.key.hz * 2/Math.abs(this.piano.octave3);
           console.log(false);
         }
       console.log(this.ab.audio.currentTime+this.piano.attack/100);
       this.o3.type=this.piano.w3;
       this.o3.connect(this.g3);
       this.g1.connect(this.piano.eq80);
       this.g2.connect(this.piano.eq80);
       this.g3.connect(this.piano.eq80);
       this.g1.gain.value=this.piano.vol1/100;
       this.g2.gain.value=this.piano.vol2/100;
       this.g3.gain.value=this.piano.vol3/100;
       this.o1.start(0);
       //var now = this.ab.audio.currentTime;
       this.g1.gain.cancelScheduledValues(this.ab.audio.currentTime);
       this.g1.gain.setValueAtTime(0, this.ab.audio.currentTime);
       this.g1.gain.linearRampToValueAtTime(this.piano.vol1/100, this.ab.audio.currentTime + this.piano.attack/100);
       this.o2.start(0);
       this.g2.gain.cancelScheduledValues(this.ab.audio.currentTime);
       this.g2.gain.setValueAtTime(0, this.ab.audio.currentTime);
       this.g2.gain.linearRampToValueAtTime(this.piano.vol2/100, this.ab.audio.currentTime + this.piano.attack/100);
       this.o3.start(0);
       this.g3.gain.cancelScheduledValues(this.ab.audio.currentTime);
       this.g3.gain.setValueAtTime(0, this.ab.audio.currentTime);
       this.g3.gain.linearRampToValueAtTime(this.piano.vol3/100, this.ab.audio.currentTime + this.piano.attack/100);
       this.isPlaying=true;

       }
     //this.currentOsc=this.key.oscillator;

   }
   stopKey(e){
     console.log(e);
     if(this.isPlaying==true){
      //  this.g1.gain.value=0;
      //  this.g2.gain.value=0;
      //  this.g3.gain.value=0;
      //var now = this.ab.audio.currentTime;
      this.g1.gain.cancelScheduledValues(this.ab.audio.currentTime);
      this.g2.gain.cancelScheduledValues(this.ab.audio.currentTime);
      this.g3.gain.cancelScheduledValues(this.ab.audio.currentTime);
      console.log(this.g1.gain.value);
      this.g1.gain.setValueAtTime(this.g1.gain.value, this.ab.audio.currentTime);
      this.g1.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + (this.piano.release/100));
      this.g2.gain.setValueAtTime(this.g2.gain.value, this.ab.audio.currentTime);
      this.g2.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + (this.piano.release/100));
      this.g3.gain.setValueAtTime(this.g3.gain.value, this.ab.audio.currentTime);
      this.g3.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + (this.piano.release/100));
      //  this.o1.stop(0);
      //  this.o2.stop(0);
      //  this.o3.stop(0);
       this.isPlaying=false;
     }
   }

}
