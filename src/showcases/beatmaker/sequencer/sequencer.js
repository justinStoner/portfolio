import {inject, bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {AudioBus} from '../components/audio-bus';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(HttpClient, AudioBus, EventAggregator)
export class SequencerCustomElement{
  @bindable isOpen
    constructor(http, ab, ea){
      this.http=http;
      this.ea=ea;
      this.http.configure(config=>{
        config.useStandardConfiguration()
        .withDefaults({
          headers:{
            "Content-Type":"audio/mpeg"
          }
        });
      })
      this.kick;
      this.snare;
      this.ab=ab;
      this.audio=this.ab.audio;
      this.timeoutId;
      this.notePlaying=-1;
      this.drums=[];
      this.playing=false;
      console.log(this.drums);
      this.loopLength=16;
      this.tempo=120;
      this.volume=85;
      this.mixer=false;
      this.scheduled=new Array(14);
      this.scriptNode=this.audio.createScriptProcessor(4096,1,1);
      this.scriptNode.onaudioprocess=(e)=>{
        this.ab.synthOut.gain.value=Math.pow(10, this.ab.compressor.reduction/20);
      }
      for(var i=0; i<14; i++){
        this.scheduled[i]=new Array(16);
        for(var ii=0; ii<16; ii++){
          this.scheduled[i][ii]=false;
        }
      }
      for(var i=0; i<14; i++){
        if(i==0){
          this.scheduled[i][0]=true;
          this.scheduled[i][4]=true;
          this.scheduled[i][8]=true;
          this.scheduled[i][12]=true;
          this.scheduled[i][14]=true;
        }else if(i==1){
          this.scheduled[i][4]=true;
          this.scheduled[i][12]=true;
        }else if (i==2) {
          this.scheduled[i][2]=true;
        }else if(i==3){
          this.scheduled[i][6]=true;
          this.scheduled[i][10]=true;
          this.scheduled[i][14]=true;
        }else if (i==10) {
          this.scheduled[i][4]=true;
          this.scheduled[i][6]=true;
          this.scheduled[i][12]=true;
        }
      }
      console.log(this.scheduled);
      this.samples=[
        {name:'kick',sample:'Roland_TR-33_Kick', type:'kick'},
        {name:'snare',sample:'Roland_TR-33_Snare', type:'snare'},
        {name:'hh open',sample:'Roland_TR-33_HH Op', type:'hh'},
        {name:'hh close',sample:'Roland_TR-33_HH Cl', type:'hh'},
        {name:'tom hi',sample:'Roland_TR-33_Tom Hi', type:'tom'},
        {name:'tom med',sample:'Roland_TR-33_Tom Mi', type:'tom'},
        {name:'tom low',sample:'Roland_TR-33_Tom Lo', type:'tom'},
        {name:'bongo hi',sample:'Roland_TR-33_Bongo Hi', type:'tom'},
        {name:'bongo med',sample:'Roland_TR-33_Bongo Mi', type:'tom'},
        {name:'bongo low',sample:'Roland_TR-33_Bongo Lo', type:'tom'},
        {name:'conga hi',sample:'Roland_TR-33_Conga Hi', type:'tom'},
        {name:'conga med',sample:'Roland_TR-33_Conga Mi', type:'tom'},
        {name:'conga low',sample:'Roland_TR-33_Conga Lo', type:'tom'},
        {name:'clave',sample:'Roland_TR-33_Clave', type:'tom'}
      ];

      //see here http://www.audio-issues.com/music-mixing/drum-eq-guide/
      this.eqFreqs={
        kick:[50, 450, 3000, 150],
        kickRange:{
          low:[50, 100],
          mid:[300, 600],
          high:[2000, 4000],
          lowmid:[150, 250]
        },
        snare:[150, 500, 3000],
        snareRange:{
          low:[50, 200],
          mid:[300, 600],
          high:[2000, 4000]
        },
        hh:[200, 500, 5000],
        hhRange:{
          low:[100, 300],
          mid:[300, 900],
          high:[4000, 7000]
        },
        tom:[250, 600, 5000],
        tomRange:{
          low:[80, 250],
          mid:[300, 900],
          high:[5000, 7000]
        }
      }
    }
    attached(){
      for(var i=0;i<this.samples.length;i++){
        var obj={
          name:this.samples[i].name,
          sound:this.loadSample(this.samples[i].sample, i),
          type:this.samples[i].type,
          scheduled:[],
          volume:50,
          pitch:0,
          high:40,
          highFreq:this.eqFreqs[this.samples[i].type][2],
          mid:40,
          midFreq:this.eqFreqs[this.samples[i].type][1],
          low:40,
          lowFreq:this.eqFreqs[this.samples[i].type][0],
          range:this.eqFreqs[this.samples[i].type+'Range'],
          Q:10,
          cutoff:200,
          filterType:'lowpass',
          eq120:this.audio.createBiquadFilter(),
          eq600:this.audio.createBiquadFilter(),
          eq5k:this.audio.createBiquadFilter(),
          filter1 : this.ab.audio.createBiquadFilter(),
          filter2 : this.ab.audio.createBiquadFilter()
        }
        if(obj.type==='kick'){
          obj.lowmid=this.eqFreqs[this.samples[i].type][3];
        }
        this.drums.push(obj);
      }
      this.gain=this.ab.audio.createGain();
      this.sideChainGain=this.ab.audio.createGain();
      this.gain.value=1.0;
    }
    toggleMixer(){
      this.mixer=!this.mixer;
    }

    loadSample(type, i){
      this.http.fetch("audio/roland-tr-33/"+type+".wav")
      .then(res=>res.arrayBuffer())
      .then(res=>{
        this.audio.decodeAudioData(res, (buffer)=>{
          this.drums[i].sound=buffer;
        })
      })
    }
    playSound(buffer, time, name, i){
      var src=this.audio.createBufferSource();
      src.buffer=buffer;

      this.drums[i].eq120.frequency.value=this.drums[i].lowFreq;
      this.drums[i].eq120.type="lowshelf";
      this.drums[i].eq120.gain.value=this.drums[i].low-40;

      this.drums[i].eq600.frequency.value=this.drums[i].midFreq;
      this.drums[i].eq600.type="peaking";
      this.drums[i].eq600.gain.value=this.drums[i].mid-40;

      this.drums[i].eq5k.frequency.value=this.drums[i].highFreq;
      this.drums[i].eq5k.type="highshelf";
      this.drums[i].eq5k.gain.value=this.drums[i].high-40;

      this.drums[i].filter1.type = this.drums[i].filterType;
      this.drums[i].filter1.Q.value = this.drums[i].Q;
      this.drums[i].filter1.frequency.value = this.drums[i].cutoff*100;

      this.drums[i].filter2.type = this.drums[i].filterType;
      this.drums[i].filter2.Q.value = this.drums[i].Q;
      this.drums[i].filter2.frequency.value = this.drums[i].cutoff*100;

      src.connect(this.drums[i].eq120);
      this.drums[i].eq120.connect(this.drums[i].eq600);
      this.drums[i].eq600.connect(this.drums[i].eq5k);
      this.drums[i].eq5k.connect(this.drums[i].filter1);
      this.drums[i].filter1.connect(this.drums[i].filter2);

      if(name==='kick' && this.ab.compressionOn){
        this.ea.publish('sidechain', time);
        this.scriptNode.disconnect();
        this.drums[i].filter2.connect(this.sideChainGain);
        this.scriptNode=this.audio.createScriptProcessor(4096,1,1);
        this.scriptNode.onaudioprocess=(e)=>{
          this.ab.synthOut.gain.value=Math.pow(10, this.ab.compressor.reduction/20);
        }
        this.sideChainGain.connect(this.ab.compressor);
        this.scriptNode.connect(this.ab.compressor);
        this.sideChainGain.connect(this.ab.drumsIn)
      }else if(name === 'kick' && !this.ab.compressionOn){
        this.scriptNode.disconnect();
        this.drums[i].filter2.connect(this.gain);
        this.gain.connect(this.ab.drumsIn);
      }
      if(name!=='kick'){
        this.drums[i].filter2.connect(this.gain);
        this.gain.connect(this.ab.drumsIn);
      }
      this.gain.gain.value=this.volume/50;
      this.sideChainGain.gain.value=this.volume/50;
      src.start(time);
    }
    playSample(buffer){
      var src=this.audio.createBufferSource();
      src.buffer=buffer;
      src.connect(this.gain);
      this.gain.connect(this.ab.drumsIn);
      this.gain.gain.value=this.volume/50;
      src.start(0);
    }
    changeTempo(up){
      //bugged
      if(up){
        this.tempo=this.tempo+=4;
      }else{
        if(this.tempo>4){
          this.tempo-=4;
        }
      }
    }
    handlePlay() {
      if(!this.playing){
        this.noteTime = 0.0;
        this.startTime = this.audio.currentTime + 0.005;
        this.rhythmIndex = 0;
        this.notePlaying=0;
        this.schedule();
        this.playing=true;
      }else{
        this.playing=false;
        cancelAnimationFrame(this.timeoutId);
        this.notePlaying=-1;
      }
    }
    addNote(e, i, ii){
      console.log(i);
      if(this.scheduled[i][ii]==true){
        this.scheduled[i][ii]=false
        e.srcElement.classList.remove('blue');
        e.srcElement.classList.add('green');
        e.srcElement.classList.add('accent-3');
      }else{
        this.scheduled[i][ii]=true;
        e.srcElement.classList.remove('green');
        e.srcElement.classList.remove('accent-3');
        e.srcElement.classList.add('blue');
      }

    }
    clearNote(i, ii){

    }
    handleStop() {

    }

    schedule() {
      var currentTime = this.audio.currentTime;
      // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
      currentTime -= this.startTime;
      while (this.noteTime < currentTime + 0.200) {
        var contextPlayTime = this.noteTime + this.startTime;
        for(var i=0;i<this.scheduled.length;i++){
          if(this.scheduled[i][this.rhythmIndex]===true){
            this.playSound(this.drums[i].sound, contextPlayTime, this.drums[i].name, i);
          }
        }
        this.advanceNote();
      }
      this.timeoutId=requestAnimationFrame(this.schedule.bind(this));
    }

    advanceNote() {
        var secondsPerBeat = 60.0 / this.tempo;
        this.rhythmIndex++;
        if (this.rhythmIndex == this.loopLength) {
            this.rhythmIndex = 0;
        }
        this.notePlaying=this.rhythmIndex;
        this.noteTime += 0.25 * secondsPerBeat;
    }
}
