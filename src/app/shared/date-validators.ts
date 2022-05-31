import {FormControl} from "@angular/forms";

export class DateValidators {
  static dateFormat(control: FormControl) : any {
    if(!control.value) {return null;}
    const today = new Date();
    const dateToCheck = new Date(control.value);
    if(dateToCheck <= today){
      return {dateFormat: {valid: false}}
    }
    return null;
  }
}
