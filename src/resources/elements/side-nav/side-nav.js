import {inject} from 'aurelia-framework';
import {AppRouter} from '../../../app-router';
import {DrumService} from '../../../services/drum-service';
import {AudioBus} from '../../../showcases/beatmaker/components/audio-bus';
@inject(AppRouter, DrumService, AudioBus)
export class SideNav {
  //the side drawer, meant to go inside navigation.html
  constructor(appRouter, ds, ab) {
    this.appRouter=appRouter;
    this.ds=ds;
    this.ab=ab;
  }
}
