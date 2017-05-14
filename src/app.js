import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AppRouter} from './app-router';
@inject(EventAggregator, AppRouter)
export class App {
  constructor(ea, appRouter) {
    this.ea=ea;
    this.appRouter=appRouter;
  }

  configureRouter(config, router){
    console.log('1');
    config.title="Justin Stoner";
    config.map([
      { route: ['', 'about'],  name: 'about', moduleId: 'about', href:'#/about', nav: true, title:'About', settings:{icon:'person'}},
      // { route: 'work',  name: 'work',      moduleId: 'work',      nav: true, title:'Work', auth:false, href:'#/work'},
      { route: 'showcase',  name: 'showcase',      moduleId: 'showcase',      nav: true, title:'Showcase', settings:{icon:'whatshot'} }
    ]);
    this.appRouter.setRouter(router);
    console.log(this.appRouter);
  }
  attached(){
    window.addEventListener('resize', ()=>{
      this.ea.publish('resize');
    });
  }
}
