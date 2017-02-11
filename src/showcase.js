export class Showcase{
  constructor(){

  }
  configureRouter(config, router){
    config.map([
      { route: ['', 'beatmaker'],  name: 'beatmaker', moduleId: './showcases/beatmaker/beat-maker', href:'#/showcase/beatmaker', nav: true, title:'BeatMaker' }
    ]);
    this.router=router;
  }
}
