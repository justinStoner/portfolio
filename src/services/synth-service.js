import {inject} from 'aurelia-framework';
import {AudioBus} from '../showcases/beatmaker/components/audio-bus';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(AudioBus, EventAggregator)
export class SynthService{
  constructor(ab, ea){
    this.ab=ab;
    this.ea=ea;
    this.octaves=[-3,-2,-1,0,1,2,3];
    this.waves=['sine', 'sawtooth', 'square', 'triangle'];
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
    this.master = this.ab.audio.createGain();
    this.master.gain.value=this.masterVol/50;

    this.master.connect(this.ab.synthIn);

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
    this.ea.subscribe('lpfCutoff', msg=>{
      this.lpfCutoff=msg;
      for(var i=0;i<this.notes.length;i++){
        this.notes[i]['f1'].frequency.value = msg*100;
        this.notes[i]['f2'].frequency.value = msg*100;
      }
    })
    this.ea.subscribe('lpfQ', msg=>{
      this.lpfQ=msg
      for(var i=0;i<this.notes.length;i++){
        this.notes[i]['f1'].Q.value = msg;
        this.notes[i]['f2'].Q.value = msg;
      }
    })
    this.ea.subscribe('lpfMod', msg=>{
      this.lpfMod=msg;
      for(var i=0;i<this.notes.length;i++){
        this.notes[i].modfilterGain.gain.value=msg*24;
      }
    })

    this.ea.subscribe('synthvol', msg=>{
      this.master.gain.value=msg/50;
    })
    this.ea.subscribe('lfofreq', msg=>{
      this.lfoData.freq=msg;
      for(var i=0;i<this.notes.length;i++){
        this.notes[i].lfo.frequency.value=msg;
      }
    })
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

     if(this.notes[i].isPlaying===false){
       //create lfo
       this.notes[i].lfo=this.ab.audio.createOscillator();
       this.notes[i].lfo.type=this.waves[this.lfoData.wave===0.1?0:this.lfoData.wave];
       this.notes[i].lfo.frequency.value=this.lfoData.freq;
       this.notes[i].lfo.detune.value=this.lfoData.detune;

       //create filters
       this.notes[i]['f1'] = this.ab.audio.createBiquadFilter();
       this.notes[i]['f1'].type = "lowpass";
       this.notes[i]['f1'].Q.value = this.lpfQ;
       this.notes[i]['f1'].frequency.value = this.lpfCutoff*100;
       this.notes[i]['f2'] = this.ab.audio.createBiquadFilter();
       this.notes[i]['f2'].type = "lowpass";
       this.notes[i]['f2'].Q.value = this.lpfQ;
       this.notes[i]['f2'].frequency.value = this.lpfCutoff*100;

       for(var ii=0;ii<this.oscillators.length;ii++){
         //create lfo gain, connect lfo to it
         this.notes[i]['lfoOscGain'+ii]=this.ab.audio.createGain();
         this.notes[i]['lfoOscGain'+ii].gain.value=this.lfoData['osc'+(ii+1)]/100;
         this.notes[i].lfo.connect(this.notes[i]['lfoOscGain'+ii]);

         //create oscillator
         this.notes[i]['o'+ii]=this.ab.audio.createOscillator();
         this.notes[i]['o'+ii].detune.value=this.oscillators[ii].detune-50;
         if(this.oscillators[ii].octave-3==0){
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz;
         }else if (this.oscillators[ii].octave-3>0){
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz * 2*(this.oscillators[ii].octave-3);
         }else{
           this.notes[i]['o'+ii].frequency.value=this.notes[i].hz * 2/Math.abs(this.oscillators[ii].octave-3);
         }
         this.notes[i]['o'+ii].type=this.waves[this.oscillators[ii].wave];

         //connect lfo gain to osc frequency
         this.notes[i]['lfoOscGain'+ii].connect(this.notes[i]['o'+ii].frequency);

         //create oscillator gain
         this.notes[i]['g'+ii]=this.ab.audio.createGain();
         this.notes[i]['g'+ii].gain.value=0.0005*this.oscillators[ii].volume;

         //connect oscillator to osc gain
         this.notes[i]['o'+ii].connect(this.notes[i]['g'+ii]);
         //connect osc gain to filter1
         this.notes[i]['g'+ii].connect( this.notes[i]['f1'] );
       }

       this.notes[i].modfilterGain=this.ab.audio.createGain();
       this.notes[i].modfilterGain.gain.value=this.lpfMod*24;
       this.notes[i].modfilterGain.connect( this.notes[i]['f1'].detune );	// filter tremolo
       this.notes[i].modfilterGain.connect( this.notes[i]['f2'].detune );	// filter tremolo
       this.notes[i].lfo.connect(this.notes[i].modfilterGain);

       this.notes[i]['f1'].connect( this.notes[i]['f2'] );
       this.notes[i]['e']=this.ab.audio.createGain();
       this.notes[i]['f2'].connect(this.notes[i]['e']);
       this.notes[i]['e'].connect(this.master);

       var now = this.ab.audio.currentTime;
       var atkEnd=now + (this.envA/100.0);
       this.notes[i]['e'].gain.value = 0.0;
       this.notes[i]['e'].gain.setValueAtTime( 0.0, now );
       this.notes[i]['e'].gain.linearRampToValueAtTime( 1.0, atkEnd );
       this.notes[i]['e'].gain.setTargetAtTime( (this.envS/100.0), atkEnd, (this.envD/100.0)+0.001 );

       var filterAttackLevel = this.lpfEnv*72;
       var filterSustainLevel = filterAttackLevel* this.lpfS / 100.0;
       var filterAttackEnd = (this.lpfA/100.0);

       if (!filterAttackEnd){
         filterAttackEnd=0.05;
       }

       this.notes[i]['f1'].detune.setValueAtTime( 0, now );
       this.notes[i]['f1'].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
       this.notes[i]['f2'].detune.setValueAtTime( 0, now );
       this.notes[i]['f2'].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
       this.notes[i]['f1'].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.lpfD/100.0)+0.001 );
       this.notes[i]['f2'].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.lpfD/100.0)+0.001 );

       this.notes[i].lfo.start(0);
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
    	this.notes[i]['e'].gain.cancelScheduledValues(now);
    	this.notes[i]['e'].gain.setValueAtTime( this.notes[i]['e'].gain.value, now );
    	this.notes[i]['e'].gain.setTargetAtTime(0.0, now, (this.envR/100.0)+0.001);
    	this.notes[i]['f1'].detune.cancelScheduledValues(now);
    	this.notes[i]['f1'].detune.setTargetAtTime( 0, now, (this.lpfR/100.0) +0.001);
    	this.notes[i]['f2'].detune.cancelScheduledValues(now);
    	this.notes[i]['f2'].detune.setTargetAtTime( 0, now, (this.lpfR/100.0) +0.001);

      for(var ii=0;ii<this.oscillators.length;ii++){
        this.notes[i]['g'+ii].gain.cancelScheduledValues(now);
        this.notes[i]['g'+ii].gain.setTargetAtTime( 0, now, (this.envR/100.0) +0.001);
        this.notes[i]['o'+ii].stop(now+(this.envR/30.0));
      }
      this.notes[i].lfo.stop(now+(this.envR/30.0))
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
