import moment from 'moment';
//like an angular filter, | is added after the property to be bound, after the | is the filter name.
//this one takes a date value and displays one of a different format
export class DateValueConverter {
  toView(value, format) {
    if(!value){
      return null;
    }
    if(!format){
      format='MMM Do YYYY';
    }
    return moment(value).format(format);
  }

  fromView(value) {

  }
}
