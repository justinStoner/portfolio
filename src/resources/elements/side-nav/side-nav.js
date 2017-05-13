import {inject} from 'aurelia-framework';
import {AppRouter} from '../../../app-router';
import {DrumService} from '../../../services/drum-service';
@inject(AppRouter, DrumService)
export class SideNav {
  //the side drawer, meant to go inside navigation.html
  constructor(appRouter, ds) {
    this.appRouter=appRouter;
    this.ds=ds;
  }
}
