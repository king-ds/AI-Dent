import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()

export class StudentNumberValidator {
  
  debouncer : any;

  constructor(public api_service : ApiService ){

  }

  check_student_number(control : FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.api_service.validate_student_number(control.value).subscribe((res) => {
          if(res){
            // resolve({'student_numberInUse': true});
            resolve({'student_numberInUse': true});
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