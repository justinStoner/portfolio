import {inject, bindable} from 'aurelia-framework';
import MaterialDateTimePicker from 'material-datetime-picker';
//see time-picker.js
//only this one must be passed the value it is to change on close
@inject(Element)
export class DatePickerCustomAttribute {
  @bindable val
  constructor(element) {
    this.element = element;
  }
  attached(){
    const datepicker = new MaterialDateTimePicker({
      styles: {
        scrim: 'c-scrim--date-only',
      }
    })
    .on('submit', (val) => {
      this.val=val.format("MM/DD/YYYY");
    })
    this.element.addEventListener('focus', () => datepicker.open());
  }
  valueChanged(newValue, oldValue) {

  }
}
