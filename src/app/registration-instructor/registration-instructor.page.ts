import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { UsernameValidator } from '../validators/username_validator';

@Component({
  selector: 'app-registration-instructor',
  templateUrl: './registration-instructor.page.html',
  styleUrls: ['./registration-instructor.page.scss'],
})
export class RegistrationInstructorPage implements OnInit {

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
    'password' : [
      { type : 'minlength', message : 'Password must be atleast 8 characters long.' },
      { type : 'required', message : 'Password is required' },
    ],
  }

  constructor(public alert_controller: AlertController,
              public form_builder : FormBuilder,
              public api_service : ApiService,
              public username_validator : UsernameValidator,
              ){
    this.register_form = form_builder.group({

      username : ['', Validators.compose([Validators.minLength(6), Validators.required]), username_validator.check_username.bind(username_validator)],
      password : ['', Validators.compose([Validators.minLength(8), Validators.required])],
      password_again : ['', Validators.required],
      first_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      middle_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    }, {validator: this.matching_password('password', 'password_again')});
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

  ngOnInit() {
  }

  register(){
    this.submit_attempt = true;

    let register_data = {
      "username" : this.register_form.value.username,
      "password" : this.register_form.value.password,
      "first_name" : this.register_form.value.first_name,
      "middle_name" : this.register_form.value.middle_name,
      "last_name" : this.register_form.value.last_name,
    }

    if(!this.register_form.valid || !this.check_check_box){
      console.log('invalid');
    }else{

      this.api_service.post_register_clinical_instructor(register_data);
      this.submit_attempt = false;
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
