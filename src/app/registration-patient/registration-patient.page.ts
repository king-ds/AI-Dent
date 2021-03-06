import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController} from '@ionic/angular';
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
  passwordType : string = 'password';
  passwordShown : boolean = false;

  validation_messages = {
    'username' : [
      { type : 'required', message : 'Username is required.' },
      { type : 'minlength', message : 'Username must be at least 6 characters long.' },
      { type : 'username_InUse', message : 'Username is already taken.' },
    ],
    'first_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],

    'middle_initial' : [
      // { type : 'required', message : 'Middle Name is required.' },
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
      { type : 'required', message : 'Height is required' },
      { type : 'pattern', message : "Height must be in feet and inches format e.g (5'2'')." },
    ],
    'weight' : [
      { type : 'required', message : 'Weight is required' },
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
    'emergency_full_name' : [
      { type : 'required', message : 'Full Name is required.' },
      { type : 'pattern', message : 'Full Name must contain only letters.' },
    ],
    // 'emergency_middle_name' : [
    //   { type : 'required', message : 'First Name is required.' },
    //   { type : 'pattern', message : 'First Name must contain only letters.' },
    // ],
    // 'emergency_last_name' : [
    //   { type : 'required', message : 'First Name is required.' },
    //   { type : 'pattern', message : 'First Name must contain only letters.' },
    // ],
    // 'emergency_address' : [
    //   { type : 'required', message : 'Emergency contact person address is required.' }
    // ],
    'emergency_telephone_num' : [
      { type : 'minlength', message : 'Telephone number must be exactly 8 numbers long.' },
      { type : 'maxlength', message : 'Telephone number must be exactly 8 numbers long.' },
      { type : 'pattern', message : 'Invalid telephone number.' }
    ],
    'emergency_phone_num' : [
      { type : 'minlength', message : 'Phone number must be exactly 11 numbers long.' },
      { type : 'maxlength', message : 'Phone number must be exactly 11 numbers long.' },
      { type : 'pattern', message : 'Invalid phone number.' }
    ],
    'relation_to_patient' : [
      { type : 'required', message : 'Relationship to patient is required.' }
    ]
  }

  constructor(public alert_controller : AlertController,
              public api_service : ApiService,
              public form_builder : FormBuilder,
              public username_patient_validator : UsernameValidator,
              public toastController : ToastController,
              ) { 
    this.register_form = form_builder.group({

      username : ['', Validators.compose([Validators.minLength(6), Validators.required]), username_patient_validator.check_patient_username.bind(username_patient_validator)],
      password : ['', Validators.compose([Validators.minLength(8), Validators.required])],
      password_again : ['', Validators.required],
      title : ['', Validators.required],
      first_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z .-]*'), Validators.required])],
      middle_initial : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z .-]*')])],
      last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z .-]*'), Validators.required])],
      gender : ['', Validators.required],
      birthdate : ['', Validators.required],
      religion : [''],
      marital_status : ['', Validators.required],
      occupation : ['', Validators.required],
      // number_of_kids : ['', Validators.required],
      height : ['', Validators.compose([Validators.pattern("[1-9]['][0-9][0-9]?['][']")])],
      weight : [''],
      permanent_address : ['', Validators.required],
      telephone_num : ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')])],
      phone_num : ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0][9][0-9]*')])],
      email_address : ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      emergency_full_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z .-]*'), Validators.required])],
      // emergency_middle_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      // emergency_last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      relation_to_patient : ['', Validators.required],
      emergency_address : [''],
      emergency_telephone_num : ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')])],
      emergency_phone_num : ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0][9][0-9]*')])],
    }, {validator: this.matching_password('password', 'password_again')});
  }

  ngOnInit(){

  }
  
  ionViewWillEnter() {
    this.register_form.reset();
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
      "middle_initial" : this.register_form.value.middle_initial,
      "last_name" : this.register_form.value.last_name,
      "gender" : this.register_form.value.gender,
      // "birthdate" : this.register_form.value.birthdate.split('T')[0],
      "birthdate" : format(new Date(this.register_form.value.birthdate), "yyyy-MM-dd"),
      "religion" : this.register_form.value.religion,
      "marital_status" : this.register_form.value.marital_status,
      "occupation" : this.register_form.value.occupation,
      // "number_of_kids" : this.register_form.value.number_of_kids,
      "height" : this.register_form.value.height,
      "weight" : this.register_form.value.weight,
      "permanent_address" : this.register_form.value.permanent_address,
      "telephone_num" : this.register_form.value.telephone_num,
      "phone_num" : this.register_form.value.phone_num,
      "email_address" : this.register_form.value.email_address,
      "emergency_full_name" : this.register_form.value.emergency_full_name,
      // "emergency_middle_name" : this.register_form.value.emergency_middle_name,
      // "emergency_last_name" : this.register_form.value.emergency_last_name,
      "relation_to_patient" : this.register_form.value.relation_to_patient,
      "emergency_address" : this.register_form.value.emergency_address,
      "emergency_telephone_num" : this.register_form.value.emergency_telephone_num,
      "emergency_phone_num" : this.register_form.value.emergency_phone_num,
    }

    if(!this.check_check_box){
      this.notAgreed();
    }else if(!this.register_form.valid){
      this.notValid();
    }else{
      this.api_service.post_register_patient(register_data);
      this.submit_attempt = false;
    }
  }

  public togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  async notValid() {
    const toast = await this.toastController.create({
      message: 'Some of the fields are invalid. Please ensure the validity of information.',
      duration: 3000
    });
    toast.present();
  }

  async notAgreed() {
    const toast = await this.toastController.create({
      message: 'You must agree first with terms & conditions of the application.',
      duration: 3000
    });
    toast.present();
  }

  async present_terms_conditions() {
    const alert = await this.alert_controller.create({
      header: 'Terms & Conditions',
      message: 'The patient, clinician, clinical instructor agrees to create an account through the application.'+

      '<br><br>The application is only available to android platform only.'+
      '<br><br>Improper use of the application will be prohibited from further use.'+
      
      '<br><br>Misinformation may be used for ground legal actions.'+
      
      '<br><br>The patients information provided herein is true and will be held confidential. However, the patient agrees to share his/her information to other clinicians but not to any third party.'+
      
      '<br><br>The patient agrees he/she cannot change nor edit other information except his/her personal information provided with climician supervision.'+
      
      '<br><br>Clinicians are authorize to edit their chart without prior notice to the patient if it doesnt concern him/her.'+
      
      '<br><br>Clinicians who are not duly or havent enrolled, already graduated in the university will have their account nullified.'+
      
      '<br><br>Any participation in the service will constitute acceptance to the agreement.',
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
