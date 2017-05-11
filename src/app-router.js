export class AppRouter{
  //all routing information is stored here for ease of importing to other components
  constructor(){
    this.router;
    this.showcaseRouter;
    this.beatmakerRouter;
    this.beatmakerSet=false;
  }

  setRouter(r){
    this.router=r;
  }
  setShowcase(r){
    this.showcaseRouter=r;
  }
  setBeat(r){
    this.beatmakerRouter=r;
    this.beatmakerSet=true;
  }
  get navigation(){
    return this.router.navigation;
  }
  get showcase(){
    return this.showcaseRouter.navigation;
  }
  get beatMaker(){
    return this.beatmakerRouter.navigation;
  }
}
