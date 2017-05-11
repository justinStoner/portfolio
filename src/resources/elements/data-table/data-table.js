import {inject, bindable} from 'aurelia-framework';
import models from '../../../models'
import {DialogService} from 'aurelia-dialog';
@inject(DialogService)
export class DataTable {
  //bindable properties to configure data table allowing for maximum re use
  @bindable paginate;
  @bindable add;
  @bindable filter;
  @bindable data;
  @bindable labels;
  @bindable fieldNames;
  @bindable model;
  @bindable addModal;
  @bindable service;
  @bindable tableView;
  @bindable filterModal;
  @bindable fullList;
  constructor(dialog) {
    this.dialog=dialog;
    this.loading=false;
    this.rows=10;
    this.currentIndex=0;
  }
  attached(){

    this.config=models[this.model];
    this.lastFilters=JSON.parse(JSON.stringify(this.config.filters));
    console.log(this.config);
    console.log(this.filterModal);
    if(!this.data){
      this.loading=true;
      this.loadItems()
      console.log(this.addModal);
    }
  }
  loadItems(index=0){
    this.currentIndex=index;
    this.loading=true;
    console.log(index, this.rows);
    var arr=[].concat(this.lastFilters.filtersBottom, this.lastFilters.filtersLeft, this.lastFilters.filtersRight)
    this.service.loadItems(index, this.rows, arr).then(res=>{
      console.log(res);
      this.loading=false;
    });
  }

  //open passed in create view in a modal, if modal wasnt cancelled create item
  createItem(){
    this.dialog.open({viewModel: this.addModal, model:'event'})
    .whenClosed(res=>{
      console.log(res);
      if(!res.wasCancelled){
        this.service.createItem(res.output).then(response=>{
          if(response.success){
            this.loadItems();
          }
        })
      }else{

      }
    })
  }
  //open passed in filter view, if not cancelled load filtered items
  applyFilters(){
    this.dialog.open({viewModel: this.filterModal, model:this.lastFilters})
    .whenClosed(res=>{
      console.log(res);
      if(!res.wasCancelled){
        this.lastFilters=res.output;
        this.loadItems();
      }else{

      }
    })
  }
  setRows(r){
    this.rows=r;
  }
}
