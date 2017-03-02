import {AudioBus} from '../components/audio-bus';
import {inject} from 'aurelia-framework';
@inject(AudioBus)
export class Equalizer{
  constructor(ab){
    this.eq1=0;
    this.eq2=0;
    this.eq3=0;
    this.eq4=0;
    this.eq5=0;
    this.ab=ab;
    //min, max: -40, 40
  }
  // createEq(){
  //   this.eq80=this.ab.audio.createBiquadFilter();
  //   this.eq350=this.ab.audio.createBiquadFilter();
  //   this.eq720=this.ab.audio.createBiquadFilter();
  //   this.eq16k=this.ab.audio.createBiquadFilter();
  //   this.eq5k=this.ab.audio.createBiquadFilter();
  //   this.eq80.frequency.value=80;
  //   this.eq80.type="lowshelf";
  //   this.eq80.gain.value=this.eq1;
  //   this.eq350.frequency.value=350;
  //   this.eq350.type="peaking";
  //   this.eq350.gain.value=this.eq2;
  //   this.eq720.frequency.value=720;
  //   this.eq720.type="peaking";
  //   this.eq720.gain.value=this.eq3;
  //   this.eq16k.frequency.value=1600;
  //   this.eq16k.type="peaking";
  //   this.eq16k.gain.value=this.eq4;
  //   this.eq5k.frequency.value=5000;
  //   this.eq5k.type="highshelf";
  //   this.eq5k.gain.value=this.eq5;
  //   this.eq80.connect(this.eq350);
  //   this.eq350.connect(this.eq720);
  //   this.eq720.connect(this.eq16k);
  //   this.eq16k.connect(this.eq5k);
  //   this.eq5k.connect(this.dInput);
  // }
}
