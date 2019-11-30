import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()

export class UsernameValidator {
  
  debouncer : any;

  constructor(public api_service : ApiService ){

  }

  check_username(control : FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.api_service.validate_username(control.value).subscribe((res) => {
          if(res){
            resolve({'username_InUse': true});
            console.log(res)
          }
        }, (err) => {
          resolve(null);
          console.log(err)
        });
      }, 1000);
    });
  }

  check_patient_username(control : FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.api_service.validate_patient_username(control.value).subscribe((res) => {
          if(res){
            resolve({'username_InUse': true});
            console.log(res)
          }
        }, (err) => {
          resolve(null);
          console.log(err)
        });
      }, 1000);
    });
  }

}