import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {AudioBus} from '../components/audio-bus';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(HttpClient, AudioBus, EventAggregator)
export class SequencerCustomElement{
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
      this.volume=100;
      this.scheduled=new Array(14);
      this.scriptNode=this.audio.createScriptProcessor(4096,1,1);
      this.scriptNode.onaudioprocess=(e)=>{
        this.ab.synthOut.gain.value=Math.pow(10, this.ab.compressor.reduction/20);
        //console.log(Math.pow(10, this.ab.compressor.reduction/20));
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
        {name:'kick',sample:'Roland_TR-33_Kick'},
        {name:'snare',sample:'Roland_TR-33_Snare'},
        {name:'hh open',sample:'Roland_TR-33_HH Op'},
        {name:'hh close',sample:'Roland_TR-33_HH Cl'},
        {name:'tom hi',sample:'Roland_TR-33_Tom Hi'},
        {name:'tom med',sample:'Roland_TR-33_Tom Mi'},
        {name:'tom low',sample:'Roland_TR-33_Tom Lo'},
        {name:'bongo hi',sample:'Roland_TR-33_Bongo Hi'},
        {name:'bongo med',sample:'Roland_TR-33_Bongo Mi'},
        {name:'bongo low',sample:'Roland_TR-33_Bongo Lo'},
        {name:'conga hi',sample:'Roland_TR-33_Conga Hi'},
        {name:'conga med',sample:'Roland_TR-33_Conga Mi'},
        {name:'conga low',sample:'Roland_TR-33_Conga Lo'},
        {name:'clave',sample:'Roland_TR-33_Clave'}
      ]
    }
    attached(){
      for(var i=0;i<this.samples.length;i++){
        var obj={
          name:this.samples[i].name,
          sound:this.loadSample(this.samples[i].sample, i),
          scheduled:[]
        }
        this.drums.push(obj);
      }
      this.gain=this.ab.audio.createGain();
      this.gain.value=1.0;
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
    playSound(buffer, time, name){
      var src=this.audio.createBufferSource();
      src.buffer=buffer;
      src.disconnect();
      this.scriptNode.disconnect();
      this.gain.disconnect();
      if(name==='kick' && this.ab.compressionOn){
        this.ea.publish('sidechain', time);

        src.connect(this.gain);
        this.scriptNode.connect(this.ab.compressor);
        this.gain.connect(this.ab.compressor);
        this.gain.connect(this.ab.drumsIn)
      }else{
        src.connect(this.gain);
        this.gain.connect(this.ab.drumsIn);
      }
      this.gain.gain.value=this.volume/50;

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
            this.playSound(this.drums[i].sound, contextPlayTime, this.drums[i].name);
          }
        }
        this.advanceNote();
      }
      this.timeoutId = requestAnimationFrame(this.schedule.bind(this))
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
