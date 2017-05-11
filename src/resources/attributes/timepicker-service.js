import TimePicker from 'material-pickers-time';
export class TimepickerService{
  //this class needed only because the timepicker im using can only have one active instance at a time for whatever reason.
  constructor(){
    this.timepicker = new TimePicker();
  }
}
