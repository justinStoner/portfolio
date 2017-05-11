import {inject} from 'aurelia-framework';
import {TimepickerService} from './timepicker-service';
//time picker custom attribute
//just add time-picker to any input element and it will automaticall become a timepicker
@inject(Element, TimepickerService)
export class TimePickerCustomAttribute {
  constructor(element, timepicker) {
    this.element = element;
    this.timepicker=timepicker;
    console.log(this.timepicker);
  }
  attached(){
    //once dom is ready, add focus listener on element and open timepicker on focus
    this.element.addEventListener('focus', event => this.timepicker.timepicker.openOnInput(event.target));
  }
  valueChanged(newValue, oldValue) {

  }
}
