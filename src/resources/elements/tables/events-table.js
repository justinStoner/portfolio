import {inject} from 'aurelia-framework';

export class EventsTable{
  constructor(){
    
  }
  activate(model){

    this.service=model.service;
    this.fullList=model.fullList;
  }
  attached(){

  }
}
