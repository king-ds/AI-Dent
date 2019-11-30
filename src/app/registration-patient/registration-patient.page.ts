import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { UsernameValidator } from '../validators/username_validator';
import {format} from "date-fns";

@Component({
  selector: 'app-registration-patient',
  templateUrl: './registration-patient.page.html',
  styleUrls: ['./registration-patient.page.scss'],
})
export class RegistrationPatientPage implements OnInit {

  public register_form : FormGroup;
  public submit_attempt : boolean = false;
  check_check_box = false;

  validation_messages = {
    'username' : [
      { type : 'required', message : 'Username is required.' },
      { type : 'minlength', message : 'Username must be at least 6 characters long.' },
      { type : 'username_InUse', message : 'Username is not available' },
    ],
    'first_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],

    'middle_name' : [
      { type : 'required', message : 'Middle Name is required.' },
      { type : 'pattern', message : 'Middle Name must contain only letters.' },
    ],

    'last_name' : [
      { type : 'required', message : 'Last Name is required' },
      { type : 'pattern', message : 'Last Name must contain only letters.' },
    ],
    'title' : [
      { type : 'required', message : 'Title/Honorific is required.' }
    ],
    'password' : [
      { type : 'minlength', message : 'Password must be atleast 8 characters long.' },
      { type : 'required', message : 'Password is required' },
    ],
    'gender' : [
      { type : 'required', message : 'Gender is required.' }
    ],
    'birthdate' : [
      { type : 'required', message : 'Birthdate is required.' }
    ],
    'marital_status' : [
      { type : 'required', message : 'Marital Status is required.' }
    ],
    'occupation' : [
      { type : 'required', message : 'Occupation is required' }
    ],
    'number_of_kids' : [
      { type : 'required', message : 'Number of kids is required but put 0 if none' }
    ],
    'height' : [
      { type : 'required', message : 'Height is required' }
    ],
    'weight' : [
      { type : 'required', message : 'Weight is required' }
    ],
    'permanent_address' : [
      { type : 'required', message : 'Permanent address is required' }
    ],
    'phone_num' : [
      { type : 'minlength', message : 'Phone number must be exactly 11 numbers long' },
      { type : 'maxlength', message : 'Phone number must be exactly 11 numbers long' },
      { type : 'pattern', message : 'Invalid phone number' }
    ],
    'telephone_num' : [
      { type : 'minlength', message : 'Telephone number must be exactly 8 numbers long' },
      { type : 'maxlength', message : 'Telephone number must be exactly 8 numbers long' },
      { type : 'pattern', message : 'Invalid telephone number' }
    ],
    'email_address' : [
      { type : 'pattern', message : 'Invalid email address' }
    ],
    'emergency_first_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],
    'emergency_middle_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],
    'emergency_last_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],
    'emergency_address' : [
      { type : 'required', message : 'Emergency contact person address is required.' }
    ],
    'emergency_telephone_num' : [
      { type : 'minlength', message : 'Telephone number must be exactly 8 numbers long' },
      { type : 'maxlength', message : 'Telephone number must be exactly 8 numbers long' },
      { type : 'pattern', message : 'Invalid telephone number' }
    ],
    'emergency_phone_num' : [
      { type : 'minlength', message : 'Phone number must be exactly 11 numbers long' },
      { type : 'maxlength', message : 'Phone number must be exactly 11 numbers long' },
      { type : 'pattern', message : 'Invalid phone number' }
    ],
  }

  constructor(public alert_controller : AlertController,
              public api_service : ApiService,
              public form_builder : FormBuilder,
              public username_patient_validator : UsernameValidator,
              ) { 
    this.register_form = form_builder.group({

      username : ['', Validators.compose([Validators.minLength(6), Validators.required]), username_patient_validator.check_patient_username.bind(username_patient_validator)],
      password : ['', Validators.compose([Validators.minLength(8), Validators.required])],
      password_again : ['', Validators.required],
      title : ['', Validators.required],
      first_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      middle_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      gender : ['', Validators.required],
      birthdate : ['', Validators.required],
      religion : [''],
      marital_status : ['', Validators.required],
      occupation : ['', Validators.required],
      number_of_kids : ['', Validators.required],
      height : ['', Validators.required],
      weight : ['', Validators.required],
      permanent_address : ['', Validators.required],
      telephone_num : ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')])],
      phone_num : ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0][9][0-9]*')])],
      email_address : ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      emergency_first_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      emergency_middle_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      emergency_last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      relation_to_patient : ['', Validators.required],
      emergency_address : ['', Validators.required],
      emergency_telephone_num : ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')])],
      emergency_phone_num : ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0][9][0-9]*')])],
    }, {validator: this.matching_password('password', 'password_again')});
  }

  ngOnInit() {
  }

  matching_password(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  register(){

    this.submit_attempt = true;

    let register_data = {
      "username" : this.register_form.value.username,
      "password" : this.register_form.value.password,
      "first_name" : this.register_form.value.first_name,
      "title" : this.register_form.value.title,
      "middle_name" : this.register_form.value.middle_name,
      "last_name" : this.register_form.value.last_name,
      "gender" : this.register_form.value.gender,
      // "birthdate" : this.register_form.value.birthdate.split('T')[0],
      "birthdate" : format(new Date(this.register_form.value.birthdate), "yyyy-MM-dd"),
      "religion" : this.register_form.value.religion,
      "marital_status" : this.register_form.value.marital_status,
      "occupation" : this.register_form.value.occupation,
      "number_of_kids" : this.register_form.value.number_of_kids,
      "height" : this.register_form.value.height,
      "weight" : this.register_form.value.weight,
      "permanent_address" : this.register_form.value.permanent_address,
      "telephone_num" : this.register_form.value.telephone_num,
      "phone_num" : this.register_form.value.phone_num,
      "email_address" : this.register_form.value.email_address,
      "emergency_first_name" : this.register_form.value.emergency_first_name,
      "emergency_middle_name" : this.register_form.value.emergency_middle_name,
      "emergency_last_name" : this.register_form.value.emergency_last_name,
      "relation_to_patient" : this.register_form.value.relation_to_patient,
      "emergency_address" : this.register_form.value.emergency_address,
      "emergency_telephone_num" : this.register_form.value.emergency_telephone_num,
      "emergency_phone_num" : this.register_form.value.emergency_phone_num,
    }

    if(!this.register_form.valid || !this.check_check_box){
      console.log('invalid');
    }else{
      this.api_service.post_register_patient(register_data);
      this.submit_attempt = false;
      console.log(register_data);
      this.register_form.reset();
    }
  }

  async present_terms_conditions() {
    const alert = await this.alert_controller.create({
      header: 'Terms & Conditions',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      cssClass: 'terms-conditions',
      buttons: [
        {
          text: 'Disagree',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.check_check_box = false
          }
        }, {
          text: 'Agree',
          handler: () => {
            this.check_check_box = true
          }
        }
      ]
    });
    await alert.present();
  }
}
