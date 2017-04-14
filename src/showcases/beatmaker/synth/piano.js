import {AudioBus} from '../components/audio-bus';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject, bindable} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {EditEffects} from '../components/edit-effects';

@inject(AudioBus, EventAggregator, DialogService)
export class Piano{
  @bindable isOpen
  constructor(ab, ea, dialog){
    this.ab=ab;
    this.ea=ea;
    this.audio=this.ab.audio;
    this.dialog=dialog;
    this.canvas="piano";
    this.octaves=[-3,-2,-1,0,1,2,3];
    this.waves=['sine', 'sawtooth', 'square', 'triangle'];
    /*
    Working towards midi support

    Equations for the Frequency Table

    The basic formula for the frequencies of the notes of the equal tempered scale is given by
    fn = f0 * (a)n
    where
    f0 = the frequency of one fixed note which must be defined. A common choice is setting the A above middle C (A4) at f0 = 440 Hz.
    n = the number of half steps away from the fixed note you are. If you are at a higher note, n is positive. If you are on a lower note, n is negative.
    fn = the frequency of the note n half steps away.
    a = (2)1/12 = the twelth root of 2 = the number which when multiplied by itself 12 times equals 2 = 1.059463094359...

    The wavelength of the sound for the notes is found from
    Wn = c/fn
    where W is the wavelength and c is the speed of sound. The speed of sound depends on temperature, but is approximately 345 m/s at "room temperature."

    Examples using A4 = 440 Hz:

    C5 = the C an octave above middle C. This is 3 half steps above A4 and so the frequency is
    f3 = 440 * (1.059463..)3 = 523.3 Hz
    If your calculator does not have the ability to raise to powers, then use the fact that
    (1.059463..)3 = (1.059463..)*(1.059463..)*(1.059463..)
    That is, you multiply it by itself 3 times.

    Middle C is 9 half steps below A4 and the frequency is:
    f -9 = 440 * (1.059463..)-9 = 261.6 Hz
    If you don't have powers on your calculator, remember that the negative sign on the power means you divide instead of multiply. For this example, you divide by (1.059463..) 9 times.

    Source: http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
    */
    this.A4=440;
    this.oscillators=createVoices();
    this.lfoData={
      wave:0.1,
      detune:50,
      osc1:4,
      osc2:8,
      osc3:12,
      freq:4,
      type:'Lfo',
      modType:0
    }
    this.oscPresets=[
      {
        wave:0.1,
        detune:45,
        octave:-3,
        volume:100,
      },
      {
        wave:2,
        detune:50,
        octave:3,
        volume:100,
      },
      {
        wave:1,
        detune:55,
        octave:4,
        volume:100,
      }
    ]
    this.masterVol=85;
    this.modMult=10;
    this.master = this.audio.createGain();
    this.master.gain.value=1.0;
    this.effectOutput=this.audio.createGain();

    this.lfo=this.audio.createOscillator();
    this.lfo.type=this.waves[this.lfoData.wave===0.1?0:this.lfoData.wave];
    this.lfo.frequency.value=this.lfoData.freq;
    this.lfo.detune.value=this.lfoData.detune;
    this.lfo.start(0);

    this.master.connect(this.effectOutput);
    this.effectOutput.gain.value=2.0;
    this.effectOutput.connect(this.ab.synthIn);

    this.lpfCutoff = 10;
    this.lpfQ = 10.0;
    this.lpfMod = 13;
    this.lpfEnv = 50;

    this.envA = 20;
    this.envD = 65;
    this.envS = 65;
    this.envR = 50;

    this.lpfA = 65;
    this.lpfD = 30;
    this.lpfS = 30;
    this.lpfR = 50;

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
      {note:'c' ,hz:523.252 ,color:true, key:'k', isPlaying:false},
      {note:'c#' ,hz:554.366 ,color:false, key:'o', isPlaying:false},
      {note:'d' ,hz:587.33 ,color:true, key:'l', isPlaying:false},
      {note:'d#' ,hz:622.254 ,color:false, key:'p', isPlaying:false},
      {note:'e' ,hz:659.256 ,color:true, key:';', isPlaying:false},
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
  openEffects(){
    this.dialog.open({
      viewModel:EditEffects,
      lock:false,
      model:'effects'
    }).then(res=>{
      console.log(res);
    })
  }
  activate(a,b,c){

  }

  canDeactivate() {

  }
  attached(){

  }
  play(e){
    let s=e.key;
    for(let i in this.notes){
      if(!e.key){
        if(String.fromCharCode(e.keyCode)==this.notes[i].key||String.fromCharCode(e.keyCode)==this.notes[i].key.toUpperCase()){
          this.playKey(i);
        }
      }else{
        if(s==this.notes[i].key){
          this.playKey(i);
        }
      }
    }
  }
  stop(e){
    let s=e.key;
    for(let i in this.notes){
      if(!e.key){
        if(String.fromCharCode(e.keyCode)==this.notes[i].key||String.fromCharCode(e.keyCode)==this.notes[i].key.toUpperCase()){
          this.stopKey(i);
        }
      }else{
        if(s==this.notes[i].key){
          this.stopKey(i);
        }
      }
    }
  }
  playKey(i){
    //change filters and envelopes to be note properties later
     if(this.notes[i].isPlaying===false){
       this.lfo.disconnect();
       this.lfo.type=this.waves[this.lfoData.wave===0.1?0:this.lfoData.wave];
       this.lfo.frequency.value=this.lfoData.freq;
       this.lfo.detune.value=this.lfoData.detune;
       this.master.gain.value=this.masterVol/50;

       for(var ii=0;ii<this.oscillators.length;ii++){
         //add filters
         this.notes[i]['f1'+i] = this.ab.audio.createBiquadFilter();
         this.notes[i]['f1'+i].type = "lowpass";
         this.notes[i]['f1'+i].Q.value = this.lpfQ;
         this.notes[i]['f1'+i].frequency.value = this.lpfCutoff*100;
         this.notes[i]['f2'+i] = this.ab.audio.createBiquadFilter();
         this.notes[i]['f2'+i].type = "lowpass";
         this.notes[i]['f2'+i].Q.value = this.lpfQ;
         this.notes[i]['f2'+i].frequency.value = this.lpfCutoff*100;
         //add oscillators
         this.notes[i]['g'+ii]=this.ab.audio.createGain();
         this.notes[i]['g'+ii].gain.value=0.0005*this.oscillators[ii].volume;
         this.notes[i]['o'+ii]=this.ab.audio.createOscillator();
         this.notes[i]['o'+ii].detune.value=this.oscillators[ii].detune-50;
         if(this.oscillators[ii].octave-3==0){
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz;
         }else if (this.oscillators[ii].octave-3>0){
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz * 2*(this.oscillators[ii].octave-3);
         }else{
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz * 2/Math.abs(this.oscillators[ii].octave-3);
         }
         this['lfoOscGain'+ii]=this.ab.audio.createGain();
         this.lfo.connect(this['lfoOscGain'+ii]);
         this['lfoOscGain'+ii].gain.value=this.lfoData['osc'+(ii+1)]/100;
         this.notes[i]['o'+ii].type=this.waves[this.oscillators[ii].wave];
         this.notes[i]['o'+ii].connect(this.notes[i]['g'+ii]);
         this.notes[i]['g'+ii].connect( this.notes[i]['f1'+i] );
         this.notes[i]['f1'+i].connect( this.notes[i]['f2'+i] );
         this.notes[i]['modfilterGain'+ii]=this.ab.audio.createGain();
         this.modfilterGain=this.ab.audio.createGain();
         this.lfo.connect(this.notes[i]['modfilterGain'+ii]);
         this.notes[i]['modfilterGain'+ii].gain.value=this.lpfMod*24;
         this.notes[i]['modfilterGain'+ii].connect( this.notes[i]['f1'+i].detune );	// filter tremolo
  	     this.notes[i]['modfilterGain'+ii].connect( this.notes[i]['f2'+i].detune );	// filter tremolo

         //add envelopes and connect to filters
         this.notes[i]['e'+i]=this.ab.audio.createGain();
         this.notes[i]['f2'+i].connect(this.notes[i]['e'+i]);

         //this.notes[i]['c'+i]=this.ab.audio.createBiquadFilter();
         //  this.notes[i]['c'+i].type='lowpass';
         //  this.notes[i]['c'+i].Q.value=10;
         //  this.notes[i]['cutfilterGain'+ii].gain.value=this.lpfMod*24;
         //  this.notes[i]['f1'+i].connect(this.notes[i]['c'+i]);
         //  this.notes[i]['f2'+i].connect(this.notes[i]['c'+i]);
         //  this.notes[i]['c'+i].connect(this.notes[i]['e'+i]);
         //  this.notes[i]['e'+i].connect(this.notes[i]['c'+i]);
         //  this.notes[i]['c'+i].connect(this.master);
         //  this.notes[i]['cutfilterGain'+ii].connect( this.notes[i]['c'+i].frequency );

         this.notes[i]['e'+i].connect(this.master);
         var now = this.ab.audio.currentTime;
         var atkEnd=now + (this.envA/100.0);
        this.notes[i]['e'+i].gain.value = 0.0;
       	 this.notes[i]['e'+i].gain.setValueAtTime( 0.0, now );
       	 this.notes[i]['e'+i].gain.linearRampToValueAtTime( 1.0, atkEnd );
       	 this.notes[i]['e'+i].gain.setTargetAtTime( (this.envS/100.0), atkEnd, (this.envD/100.0)+0.001 );

         var filterAttackLevel = this.lpfEnv*72;
         var filterSustainLevel = filterAttackLevel* this.lpfS / 100.0;
         var filterAttackEnd = (this.lpfA/100.0);

         if (!filterAttackEnd){
           filterAttackEnd=0.05;
         }

       	 this.notes[i]['f1'+i].detune.setValueAtTime( 0, now );
      	 this.notes[i]['f1'+i].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
      	 this.notes[i]['f2'+i].detune.setValueAtTime( 0, now );
      	 this.notes[i]['f2'+i].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
      	 this.notes[i]['f1'+i].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.lpfD/100.0)+0.001 );
      	 this.notes[i]['f2'+i].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.lpfD/100.0)+0.001 );
       }




       for(var ii=0;ii<this.oscillators.length;ii++){
         this.notes[i]['o'+ii].start(0);
       }

         this.notes[i].isPlaying=true;

      }
  }

  stopKey(i){
    if(this.notes[i].isPlaying===true){
      var now =  this.ab.audio.currentTime;
    	var release = now + (this.envR/100.0);
    	this.notes[i]['e'+i].gain.cancelScheduledValues(now);
    	this.notes[i]['e'+i].gain.setValueAtTime( this.notes[i]['e'+i].gain.value, now );
    	this.notes[i]['e'+i].gain.setTargetAtTime(0.0, now, (this.envR/100.0)+0.001);
    	this.notes[i]['f1'+i].detune.cancelScheduledValues(now);
    	this.notes[i]['f1'+i].detune.setTargetAtTime( 0, now, (this.lpfR/100.0) +0.001);
    	this.notes[i]['f2'+i].detune.cancelScheduledValues(now);
    	this.notes[i]['f2'+i].detune.setTargetAtTime( 0, now, (this.lpfR/100.0) +0.001);

      for(var ii=0;ii<this.oscillators.length;ii++){
        this.notes[i]['g'+ii].gain.cancelScheduledValues(now);
        this.notes[i]['g'+ii].gain.setTargetAtTime( 0, now, (this.envR/100.0) +0.001);
        this.notes[i]['o'+ii].stop(now+(this.envR/30.0));
      }
      this.notes[i].isPlaying=false;
    }
  }
}
function createVoices(){
  var arr=[];
  for(var i=0;i<3;i++){
    arr.push(function(){
      var voice={
        volume:50,
        wave:1,
        octave:0,
        type:'Oscillator',
        detune:50
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
