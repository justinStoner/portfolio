import {inject} from 'aurelia-framework';
import {AppRouter} from './app-router';
import {DrumService} from './services/drum-service';
@inject(AppRouter, DrumService)
export class Navigation{
  constructor(appRouter, ds){
    this.appRouter=appRouter;
  }
}
