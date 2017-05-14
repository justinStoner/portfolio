import {inject} from 'aurelia-framework';
import {AudioBus} from './audio-bus';
@inject(AudioBus)
export class EditEffects{
  constructor(ab){
    this.ab=ab;
  }
  activate(model){
    this.model=model;
  }
  attached(){
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'test2');
  }
}
