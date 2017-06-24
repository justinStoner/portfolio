import {inject, bindable} from "aurelia-framework";
import {AudioBus} from '../components/audio-bus';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DrumService} from '../../../services/drum-service';
@inject(AudioBus, EventAggregator, DrumService)
export class SequencerCustomElement{
  @bindable isOpen
    constructor(ab, ea, ds){
      this.ea=ea;
      this.kick;
      this.snare;
      this.ab=ab;
      this.ds=ds;
      this.ds.loadInit();
      this.audio=this.ab.audio;

      this.mixer=false;
      this.isMobile=isMobile;

    }
    attached(){

    }
    toggleMixer(){
      this.mixer=!this.mixer;
    }


    playSound(buffer, time, name, i){
      this.ds.playSound(buffer, time, name, i);
    }
    playSample(buffer){
      this.ds.playSample(buffer);
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
      this.ds.handlePlay();
    }
    addNote(e, i, ii){
      this.ds.addNote(e, i, ii);
    }
    clearNote(i, ii){
      this.ds.clearNote(i, ii);
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
