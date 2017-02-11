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
    this.eq1=0;
    this.eq2=0;
    this.eq3=0;
    this.eq4=0;
    this.eq5=0;
    this.attack=50;
    this.release=50;
    this.octave1=0;
    this.octave2=0;
    this.octave3=0;
    this.dTime=25;
    this.dFeed=50;
    this.dWet=50;
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
    this.whiteKeys=['a','s','d','f','g','h','j','k','l',';',"'"];
    this.blackKeys=['w','e','t','y','u','o','p'];
    this.bus={
      input:this.audio.createGain(),
      output:this.audio.createGain(),
      delay:this.createDelay()
    }
    this.notes=[
      {note:'c' ,hz:261.626 ,color:true, key:'a'},
      {note:'c#' ,hz:277.183 ,color:false, key:'w'},
      {note:'d' ,hz:293.66 ,color:true, key:'s'},
      {note:'d#' ,hz:311.127 ,color:false, key:'e'},
      {note:'e' ,hz:329.628 ,color:true, key:'d'},
      {note:'f' ,hz:349.228 ,color:true, key:'f'},
      {note:'f#' ,hz:369.994 ,color:false, key:'t'},
      {note:'g' ,hz:391.995 ,color:true, key:'g'},
      {note:'g#' ,hz:415.305 ,color:false, key:'y'},
      {note:'a' ,hz:440 ,color:true, key:'h'},
      {note:'a#' ,hz:466.164 ,color:false, key:'u'},
      {note:'b' ,hz:493.883 ,color:true, key:'j'},
      {note:'c' ,hz:532.251 ,color:true, key:'k'},
      {note:'c#' ,hz:554.365 ,color:false, key:'o'},
      {note:'d' ,hz:587.33 ,color:true, key:'l'},
      {note:'d#' ,hz:622.254 ,color:false, key:'p'},
      {note:'e' ,hz:659.255 ,color:true, key:';'},
      {note:'f' ,hz:698.456 ,color:true, key:"'"}
    ];
    this.x=0;
    this.y=0;
    for(let i in this.notes){
      this.notes[i].element;
    //   if(this.notes[i].color===true){
    //
    //     this.whiteNotes[this.x]=this.notes[i];
    //     this.whiteNotes[this.x].assigned=this.whiteKeys[this.x];
    //     this.whiteNotes[this.x].element;
    //     this.whiteNotes[this.x].index;
    //     this.notes[i].key=this.whiteKeys[this.x];
    //     this.notes[i].index=this.x;
    //     this.x++;
    //   }else{
    //     this.blackNotes[this.y]=this.notes[i];
    //     this.blackNotes[this.y].assigned=this.blackKeys[this.y];
    //     this.blackNotes[this.y].element;
    //     this.blackNotes[this.y].index;
    //     this.notes[i].key=this.blackKeys[this.y];
    //     this.notes[i].index=this.y;
    //     this.y++;
    // }

  }

    this.playEvent=document.createEvent('event');
    this.stopEvent=document.createEvent('event');
    this.playEvent.initEvent('play',true,true);
    this.stopEvent.initEvent('stop',true,true);

    window.addEventListener('keydown', this.play.bind(this));
    window.addEventListener('keyup', this.stop.bind(this));

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
  createDelay(){
    this.dInput = this.audio.createGain();
   this.output = this.audio.createGain();
   this.delay = this.audio.createDelay(5.0);
   this.feedback = this.audio.createGain();
   this.wetLevel = this.audio.createGain();
  this.eq80=this.audio.createBiquadFilter();
  this.eq350=this.audio.createBiquadFilter();
  this.eq720=this.audio.createBiquadFilter();
  this.eq16k=this.audio.createBiquadFilter();
  this.eq5k=this.audio.createBiquadFilter();
  this.eq80.frequency.value=80;
  this.eq80.type="lowshelf";
  this.eq80.gain.value=this.eq1;
  this.eq350.frequency.value=350;
  this.eq350.type="peaking";
  this.eq350.gain.value=this.eq2;
  this.eq720.frequency.value=720;
  this.eq720.type="peaking";
  this.eq720.gain.value=this.eq3;
  this.eq16k.frequency.value=1600;
  this.eq16k.type="peaking";
  this.eq16k.gain.value=this.eq4;
  this.eq5k.frequency.value=5000;
  this.eq5k.type="highshelf";
  this.eq5k.gain.value=this.eq5;
   //set some decent values
   this.delay.delayTime.value = this.dTime/100;
   this.feedback.gain.value = this.dFeed/100;
   this.wetLevel.gain.value = this.dWet/100;

   //set up the routing

   this.eq80.connect(this.eq350);
   this.eq350.connect(this.eq720);
   this.eq720.connect(this.eq16k);
   this.eq16k.connect(this.eq5k);
   this.eq5k.connect(this.dInput);
   this.dInput.connect(this.delay);
   this.dInput.connect(this.output);
   this.delay.connect(this.feedback);
   this.delay.connect(this.wetLevel);
   this.feedback.connect(this.delay);
   this.wetLevel.connect(this.output);
   console.log();
   this.output.connect(this.ab.input);
  }
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
      if(s==this.notes[i].key||s==this.notes[i].key.toUpperCase()){
        this.notes[i].element.dispatchEvent(this.playEvent);
      }
    }
    console.log(this.output);
  }
  stop(e){
    let s=e.key;
    for(let i in this.notes){
      if(s==this.notes[i].key||s==this.notes[i].key.toUpperCase()){
        this.notes[i].element.dispatchEvent(this.stopEvent);
      }
    }
  }

}
export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
