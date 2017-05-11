import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import MaterialDateTimePicker from 'material-datetime-picker';
import models from 'models';
//filter modal window
@inject(DialogController)
export class EventsFilter {
  constructor(controller) {
    this.controller=controller;


  }
  activate(model){
    this.currentFilters=model;

  }
  attached(){

  }
  clear(){
    //resets current filters
    console.log(models.events.filters);
    this.currentFilters=JSON.parse(JSON.stringify(models.events.filters));
  }
}
