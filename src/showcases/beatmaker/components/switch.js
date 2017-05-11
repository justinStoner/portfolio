import {inject, bindable} from 'aurelia-framework';
@inject(Element)
export class Switch{
  @bindable switched;
  constructor(element){
    this.element=element;
  }
  attached(){
    if(this.switched){
      this.element.children[0].children[0].children[0].checked=true;
    }
  }
  toggle(){
    console.log(this.element.children[0]);
    if(this.switched){
      this.element.children[0].children[0].MaterialSwitch.off();

      this.switched=false;
    }else{
      this.element.children[0].children[0].MaterialSwitch.on();
      this.switched=true;
    }
  }
}
