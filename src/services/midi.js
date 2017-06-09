export class Midi{
  constructor(){
    this.selectMidi=null;
    this.midiAcccess=null;
    this.midiIn=null
  }
   midiMessageReceived( ev ) {
  var cmd = ev.data[0] >> 4;
  var channel = ev.data[0] & 0xf;
  var noteNumber = ev.data[1];
  var velocity = ev.data[2];

  if (channel == 9)
    return
  if ( cmd==8 || ((cmd==9)&&(velocity==0)) ) { // with MIDI, note on with velocity zero is the same as note off
    // note off
    noteOff( noteNumber );
  } else if (cmd == 9) {
    // note on
    noteOn( noteNumber, velocity/127.0);
  } else if (cmd == 11) {
    controller( noteNumber, velocity/127.0);
  } else if (cmd == 14) {
    // pitch wheel
    pitchWheel( ((velocity * 128.0 + noteNumber)-8192)/8192.0 );
  } else if ( cmd == 10 ) {  // poly aftertouch
    polyPressure(noteNumber,velocity/127)
  } else
  console.log( "" + ev.data[0] + " " + ev.data[1] + " " + ev.data[2])
}

 selectMIDIIn( ev ) {
  if (this.midiIn)
    this.midiIn.onmidimessage = null;
  var id = ev.target[ev.target.selectedIndex].value;
  if ((typeof(this.midiAccess.inputs) == "function"))   //Old Skool MIDI inputs() code
    this.midiIn = this.midiAccess.inputs()[ev.target.selectedIndex];
  else
    this.midiIn = this.midiAccess.inputs.get(id);
  if (this.midiIn)
    this.midiIn.onmidimessage = midiMessageReceived;
}

 populateMIDIInSelect() {
  // clear the MIDI input select
  this.selectMidi.options.length = 0;
  if (this.midiIn && this.midiIn.state=="disconnected")
    this.midiIn=null;
  var firstInput = null;

  var inputs=this.midiAccess.inputs.values();
  for ( var input = inputs.next(); input && !input.done; input = inputs.next()){
    input = input.value;
    if (!firstInput)
      firstInput=input;
    var str=input.name.toString();
    var preferred = !this.midiIn && ((str.indexOf("MPK") != -1)||(str.indexOf("Keyboard") != -1)||(str.indexOf("keyboard") != -1)||(str.indexOf("KEYBOARD") != -1));

    // if we're rebuilding the list, but we already had this port open, reselect it.
    if (this.midiIn && this.midiIn==input)
      preferred = true;

    this.selectMidi.appendChild(new Option(input.name,input.id,preferred,preferred));
    if (preferred) {
      this.midiIn = input;
      this.midiIn.onmidimessage = midiMessageReceived;
    }
  }
  if (!this.midiIn) {
      this.midiIn = firstInput;
      if (this.midiIn)
        this.midiIn.onmidimessage = midiMessageReceived;
  }
}

 midiConnectionStateChange( e ) {
  console.log("connection: " + e.port.name + " " + e.port.connection + " " + e.port.state );
  populateMIDIInSelect();
}

 onMIDIStarted( midi ) {
  var preferredIndex = 0;

  this.midiAccess = midi;

  document.getElementById("synthbox").className = "loaded";
  this.selectMidi=document.getElementById("this.midiIn");
  midi.onstatechange = midiConnectionStateChange;
  populateMIDIInSelect();
  this.selectMidi.onchange = this.selectMIDIIn;
}

 onMIDISystemError( err ) {
  document.getElementById("synthbox").className = "error";
  console.log( "MIDI not initialized - error encountered:" + err.code );
}

  onAttach(){
    // if (navigator.requestMIDIAccess)
    //   navigator.requestMIDIAccess().then( this.onMIDIStarted, this.onMIDISystemError );
    // }
  }

}
