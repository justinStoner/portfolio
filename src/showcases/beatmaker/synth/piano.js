import {AudioBus} from '../components/audio-bus';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';


@inject(AudioBus, EventAggregator)
export class Piano{
  constructor(ab, ea){
    this.ab=ab;
    this.ea=ea;
    this.audio=this.ab.audio;
    this.canvas="piano";
    this.octaves=[-3,-2,-1,0,1,2,3];
    this.whiteNotes=[];
    this.blackNotes=[];
    this.w1="sine";
    this.w2="sine";
    this.w3="sine";
    this.vol1=10;
    this.vol2=10;
    this.vol3=10;

    this.attack=50;
    this.release=50;
    this.octave1=0;
    this.octave2=0;
    this.octave3=0;

    this.mute1=false;
    this.mute2=false;
    this.mute3=false;

    this.currentFilterCutoff = 8;
    this.currentFilterQ = 7.0;
    this.currentFilterMod = 21;
    this.currentFilterEnv = 56;

    this.currentEnvA = 2;
    this.currentEnvD = 15;
    this.currentEnvS = 68;
    this.currentEnvR = 5;

    this.currentFilterEnvA = 5;
    this.currentFilterEnvD = 6;
    this.currentFilterEnvS = 5;
    this.currentFilterEnvR = 7;

    this.notes=[
      {note:'c' ,hz:261.626 ,color:true, key:'a', isPlaying:false},
      {note:'c#' ,hz:277.183 ,color:false, key:'w', isPlaying:false},
      {note:'d' ,hz:293.66 ,color:true, key:'s', isPlaying:false},
      {note:'d#' ,hz:311.127 ,color:false, key:'e', isPlaying:false},
      {note:'e' ,hz:329.628 ,color:true, key:'d', isPlaying:false},
      {note:'f' ,hz:349.228 ,color:true, key:'f', isPlaying:false},
      {note:'f#' ,hz:369.994 ,color:false, key:'t', isPlaying:false},
      {note:'g' ,hz:391.995 ,color:true, key:'g', isPlaying:false},
      {note:'g#' ,hz:415.305 ,color:false, key:'y', isPlaying:false},
      {note:'a' ,hz:440 ,color:true, key:'h', isPlaying:false},
      {note:'a#' ,hz:466.164 ,color:false, key:'u', isPlaying:false},
      {note:'b' ,hz:493.883 ,color:true, key:'j', isPlaying:false},
      {note:'c' ,hz:532.251 ,color:true, key:'k', isPlaying:false},
      {note:'c#' ,hz:554.365 ,color:false, key:'o', isPlaying:false},
      {note:'d' ,hz:587.33 ,color:true, key:'l', isPlaying:false},
      {note:'d#' ,hz:622.254 ,color:false, key:'p', isPlaying:false},
      {note:'e' ,hz:659.255 ,color:true, key:';', isPlaying:false},
      {note:'f' ,hz:698.456 ,color:true, key:"'", isPlaying:false}
    ];
    this.x=0;
    this.y=0;
    for(let i in this.notes){
      this.notes[i].element;
    }

    window.addEventListener('keydown', this.play.bind(this));
    window.addEventListener('keyup', this.stop.bind(this));

    this.ea.subscribe('play-key', msg=>{
      console.log(msg);
      this.playKey(msg.index);
    });

    this.ea.subscribe('stop-key', msg=>{
      this.stopKey(msg.index);
    });
  this.dInput = this.audio.createGain();
   this.output = this.audio.createGain();
   this.dInput.connect(this.output);
   this.output.connect(this.ab.input);
  }
  attached(){
    //$('select').material_select();

  }
  changeDelay(){
    this.delay.delayTime.value = this.dTime/100;
  }
  changeFeed(){
    this.feedback.gain.value = this.dFeed/100;
  }
  changeWet(){
    this.wetLevel.gain.value = this.dWet/100;
  }
  changeEq(){
    this.eq80.gain.value=this.eq1;
    this.eq350.gain.value=this.eq2;
    this.eq720.gain.value=this.eq3;
    this.eq16k.gain.value=this.eq4;
    this.eq5k.gain.value=this.eq5;
  }
  // createDelay(){
  // this.dInput = this.audio.createGain();
  //  this.output = this.audio.createGain();
  //  //this.dInput.connect(this.delay);
  //  this.dInput.connect(this.output);
  //  //this.delay.connect(this.feedback);
  //  //this.delay.connect(this.wetLevel);
  //  //this.feedback.connect(this.delay);
  //  //this.wetLevel.connect(this.output);
  //  console.log();
  //  this.output.connect(this.ab.input);
  // }
  activate(a,b,c){

  }

  canDeactivate() {

  }
  attached(){
    console.log($);
  }
  play(e){
    let s=e.key;
    console.log(e);
    for(let i in this.notes){
      if(s==this.notes[i].key||s==this.notes[i].key){
        this.playKey(i);
      }
    }
    console.log(this.output);
  }
  stop(e){
    let s=e.key;
    for(let i in this.notes){
      if(s==this.notes[i].key||s==this.notes[i].key){
        this.stopKey(i)
      }
    }
  }
  playKey(i){
     if(this.notes[i].isPlaying==false){
      this.notes[i].g1=this.ab.audio.createGain();
      this.notes[i].g2=this.ab.audio.createGain();
      this.notes[i].g3=this.ab.audio.createGain();
      this.notes[i].o1=this.ab.audio.createOscillator();
      console.log(this.notes[i].hz);
      if(this.octave1==0){
        this.notes[i].o1.frequency.value=this.notes[i].hz;
        console.log(true);
      }else if (this.octave1>0){
        this.notes[i].o1.frequency.value=this.notes[i].hz * 2*this.octave1;
        console.log(false);
      }else{
        console.log(2/Math.abs(this.octave1));
        this.notes[i].o1.frequency.value=this.notes[i].hz * 2/Math.abs(this.octave1);
        console.log(false);
      }
      this.notes[i].o1.type=this.w1;
      this.notes[i].o1.connect(this.notes[i].g1);
      this.notes[i].o2=this.ab.audio.createOscillator();
      if(this.octave2==0){
        this.notes[i].o2.frequency.value=this.notes[i].hz;
        console.log(true);
      }else if (this.octave2>0){
        this.notes[i].o2.frequency.value=this.notes[i].hz * 2*this.octave2;
        console.log(false);
      }else{
        this.notes[i].o2.frequency.value=this.notes[i].hz * 2/Math.abs(this.octave2);
        console.log(false);
      }
      this.notes[i].o2.type=this.w2;
      this.notes[i].o2.connect(this.notes[i].g2);
      this.notes[i].o3=this.ab.audio.createOscillator();
        if(this.octave3==0){
          this.notes[i].o3.frequency.value=this.notes[i].hz;
          console.log(true);
        }else if (this.octave3>0){
          this.notes[i].o3.frequency.value=this.notes[i].hz * 2*this.octave3;
          console.log(false);
        }else{
          this.notes[i].o3.frequency.value=this.notes[i].hz * 2/Math.abs(this.octave3);
          console.log(false);
        }
      console.log(this.ab.audio.currentTime+this.attack/100);
      this.notes[i].o3.type=this.w3;
      this.notes[i].o3.connect(this.notes[i].g3);
      this.notes[i].g1.connect(this.dInput);
      this.notes[i].g2.connect(this.dInput);
      this.notes[i].g3.connect(this.dInput);
      this.notes[i].g1.gain.value=this.vol1/100;
      this.notes[i].g2.gain.value=this.vol2/100;
      this.notes[i].g3.gain.value=this.vol3/100;
      this.notes[i].o1.start(0);
      //var now = this.ab.audio.currentTime;
      this.notes[i].g1.gain.cancelScheduledValues(this.ab.audio.currentTime);
      this.notes[i].g1.gain.setValueAtTime(0, this.ab.audio.currentTime);
      this.notes[i].g1.gain.linearRampToValueAtTime(this.vol1/100, this.ab.audio.currentTime + this.attack/100);
      this.notes[i].o2.start(0);
      this.notes[i].g2.gain.cancelScheduledValues(this.ab.audio.currentTime);
      this.notes[i].g2.gain.setValueAtTime(0, this.ab.audio.currentTime);
      this.notes[i].g2.gain.linearRampToValueAtTime(this.vol2/100, this.ab.audio.currentTime + this.attack/100);
      this.notes[i].o3.start(0);
      this.notes[i].g3.gain.cancelScheduledValues(this.ab.audio.currentTime);
      this.notes[i].g3.gain.setValueAtTime(0, this.ab.audio.currentTime);
      this.notes[i].g3.gain.linearRampToValueAtTime(this.vol3/100, this.ab.audio.currentTime + this.attack/100);
      this.notes[i].isPlaying=true;

      }
  }

  stopKey(i){
    //aconsole.log(e);
    if(this.notes[i].isPlaying==true){
     this.notes[i].g1.gain.cancelScheduledValues(this.ab.audio.currentTime);
     this.notes[i].g2.gain.cancelScheduledValues(this.ab.audio.currentTime);
     this.notes[i].g3.gain.cancelScheduledValues(this.ab.audio.currentTime);
     this.notes[i].g1.gain.setValueAtTime(this.notes[i].g1.gain.value, this.ab.audio.currentTime);
     this.notes[i].g1.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + (this.release/100));
     this.notes[i].g2.gain.setValueAtTime(this.notes[i].g2.gain.value, this.ab.audio.currentTime);
     this.notes[i].g2.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + (this.release/100));
     this.notes[i].g3.gain.setValueAtTime(this.notes[i].g3.gain.value, this.ab.audio.currentTime);
     this.notes[i].g3.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + (this.release/100));
      this.notes[i].isPlaying=false;
    }
  }
}
export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
