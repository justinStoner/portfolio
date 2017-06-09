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
    var testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|'  + 'Opera Mini|IEMobile|Mobile' , 'i');
    this.isMobile=testExp.test(navigator.userAgent);
  }
  attached(){
    this.container=document.querySelector('app-container');
  }
  closeDrawer(href){
    if(this.isMobile){
      document.querySelector('.mdl-layout__obfuscator').click()
    }
    this.appRouter.router.navigate(href);
  }
}
