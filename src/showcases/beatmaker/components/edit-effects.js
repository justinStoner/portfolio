import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {AudioBus} from './audio-bus';
@inject(AudioBus, DialogController)
export class EditEffects{
  constructor(ab, dialog){
    this.ab=ab;
    this.dialog=dialog;
  }
  activate(model){
    this.model=model;
  }
  attached(){
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'test2');
  }
}
