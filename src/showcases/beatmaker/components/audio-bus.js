export class AudioBus{
  constructor(){
    this.audio = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser=this.audio.createAnalyser();
    this.analyser.connect(this.audio.destination);
    this.analyser.fftSize=2048;
    this.bufferLength = this.analyser.fftSize;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.input=this.audio.createGain();
    this.output=this.audio.createGain();
    this.input.connect(this.output);
    this.output.connect(this.analyser);
      //delay:this.createDelay(),

  }



}
