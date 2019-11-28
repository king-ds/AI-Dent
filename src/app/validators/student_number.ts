import { FormControl } from '@angular/forms';

export class StudentNumberValidator {

  static check_student_number(control: FormControl): any {

    return new Promise(resolve => {

      //Fake a slow response from server

      setTimeout(() => {
        if(control.value.toLowerCase() === "12345"){

          resolve({
            "student number is taken": true
          });

        } else {
          resolve(null);
        }
      }, 2000);

    });
  }

}