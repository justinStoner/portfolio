import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
@inject(EventAggregator)
export class App {
  constructor(ea) {
    this.ea=ea;
  }
  activate(){

  }
  attached(){
    window.addEventListener('resize', ()=>{
      this.ea.publish('resize');
    });
  }
  configureRouter(config, router){
    console.log('1');
    config.title="Justin Stoner";
    config.map([
      { route: ['', 'about'],  name: 'about', moduleId: 'about', href:'#/about', nav: true, title:'About' },
      // { route: 'work',  name: 'work',      moduleId: 'work',      nav: true, title:'Work', auth:false, href:'#/work'},
      { route: 'showcase',  name: 'showcase',      moduleId: 'showcase',      nav: true, title:'Showcase', auth:false }
    ]);
    this.router=router;
  }
}
