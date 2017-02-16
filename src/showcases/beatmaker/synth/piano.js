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
    this.waves=['sine', 'sawtooth', 'square', 'triangle']
    this.oscillators=createVoices();
    this.lfoData={
      volume:50,
      wave:1,
      detune:0,
      octave:-3,
      frequency:2.1
    }
    this.modMult=1;
    this.lpf=this.audio.createBiquadFilter();
    this.master = this.audio.createGain();
    this.master.gain.value=0;
    this.effectOutput=this.audio.createGain();


    this.lpf.connect(this.master);
    this.master.connect(this.effectOutput);
    this.effectOutput.gain.value=0.7;
    this.effectOutput.connect(this.ab.input);

    this.lpfCutoff = 8;
    this.lpfQ = 7.0;
    this.lpfMod = 21;
    this.lpfEnv = 56;

    this.envA = 2;
    this.envD = 15;
    this.envS = 68;
    this.envR = 5;

    this.lpfA = 5;
    this.lpfD = 6;
    this.lpfS = 5;
    this.lpfR = 7;

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
       this.lfo=this.audio.createOscillator();
       this.lfo.type=this.waves[this.lfoData.wave];
       this.lfo.frequency.value=this.lfoData.frequency*this.modMult;

       for(var ii=0;ii<this.oscillators.length;ii++){

         this.notes[i]['g'+ii]=this.ab.audio.createGain();
         this.notes[i]['o'+ii]=this.ab.audio.createOscillator();
         console.log(this.oscillators[ii].octave-3);
         if(this.oscillators[ii].octave-3==0){
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz;
           console.log(true);
         }else if (this.oscillators[ii].octave-3>0){
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz * 2*(this.oscillators[ii].octave-3);
           console.log(false);
         }else{
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz * 2/Math.abs(this.oscillators[ii].octave-3);
           console.log(false);
         }
         this['lfoOscGain'+ii]=this.ab.audio.createGain();
         this.lfo.connect(this['lfoOscGain'+ii]);
         this['lfoOscGain'+ii].gain.value=0.5;//change to modOsc var later
         this['lfoOscGain'+ii].connect(this.notes[i]['o'+ii].frequency)
         this.notes[i]['o'+ii].type=this.waves[this.oscillators[ii].wave];
         this.notes[i]['o'+ii].connect(this.notes[i]['g'+ii]);
         this.notes[i]['g'+ii].gain.value=this.oscillators[ii].volume/100;
         this.filter1 = this.ab.audio.createBiquadFilter();
        	this.filter1.type = "lowpass";
        	this.filter1.Q.value = 7.0;
        	this.filter1.frequency.value = Math.pow(2, 8);
        	// filterFrequencyFromCutoff( this.originalFrequency, currentFilterCutoff );
        //	console.log( "filter frequency: " + this.filter1.frequency.value);
        	this.filter2 = this.ab.audio.createBiquadFilter();
        	this.filter2.type = "lowpass";
        	this.filter2.Q.value = 7.0;
        	this.filter2.frequency.value = Math.pow(2, 8);

        	this.notes[i]['g'+ii].connect( this.filter1 );
        	this.filter1.connect( this.master );
       }


       for(var ii=0;ii<2;ii++){
         this.notes[i]['o'+ii].start(0);
         this.notes[i]['g'+ii].gain.cancelScheduledValues(this.ab.audio.currentTime);
         this.notes[i]['g'+ii].gain.setValueAtTime(0, this.ab.audio.currentTime);
         this.notes[i]['g'+ii].gain.linearRampToValueAtTime(this.oscillators[ii].volume/100, this.ab.audio.currentTime + this.envA/100);
       }
         this.notes[i].isPlaying=true;

      }
  }

  stopKey(i){
    //aconsole.log(e);
    if(this.notes[i].isPlaying==true){
    for(var ii=0;ii<this.oscillators.length;ii++){
      this.notes[i]['g'+ii].gain.cancelScheduledValues(this.ab.audio.currentTime);
      this.notes[i]['g'+ii].gain.setValueAtTime(this.notes[i]['g'+ii].gain.value, this.ab.audio.currentTime);
      this.notes[i]['g'+ii].gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + (this.envR/100));
    }
      this.notes[i].isPlaying=false;
    }
  }d
}
function createVoices(){
  var arr=[];
  for(var i=0;i<2;i++){
    arr.push(function(){
      var voice={
        volume:50,
        wave:'sine',
        octave:0,
        type:'oscillator'
      }
      return voice
    });
  }
  return arr;
}
export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
