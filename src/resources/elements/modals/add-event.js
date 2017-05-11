import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';

//add event modal view
@inject(DialogController)
export class AddEvent {
  constructor(controller) {
    this.controller=controller;
    this.message = 'Hello world';
    this.event={
      name:'',
      status:'',
      date:'',
      startTime:'',
      endTime:'',
      type:'',
      company:'',
      about:'',
      city:'',
      street:'',
      registrants:0,
      waitlist:0
    }

  }
  activate(){

  }
  attached(){


  }
}
