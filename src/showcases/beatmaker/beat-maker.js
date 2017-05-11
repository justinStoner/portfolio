import {AppRouter} from '../../app-router';
import {inject} from 'aurelia-framework';
@inject(AppRouter)
export class Beatmaker {
  constructor(appRouter) {
    this.message = 'Hello world';
    this.appRouter=appRouter;
  }
  configureRouter(config, router){
    config.map([
      { route: ['', 'synth'],  name: 'synth', moduleId: './synth/piano', href:'#/showcase/beatmaker/synth', nav: true, title:'Synth' },
      { route: 'sequencer',  name: 'sequencer', moduleId: './sequencer/sequencer', href:'#/showcase/beatmaker/sequencer', nav: true, title:'Sequencer' }
    ]);
    this.appRouter.setBeat(router);
  }
}
