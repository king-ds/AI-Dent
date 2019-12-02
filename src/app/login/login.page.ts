import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login_clinician_form : FormGroup;
  public login_instructor_form : FormGroup;
  public login_patient_form : FormGroup;
  public submit_attempt : boolean = false;

  clinician_login_form = false;
  clinician_instructor_login_form = false;
  patient = false;
  success : boolean = false;

  login_loader : boolean = false;
  selection_button = true;

  constructor(public alert_controller : AlertController,
              private router: Router,
              public toast_controller : ToastController,
              public form_builder : FormBuilder,
              public api_service : ApiService,
              private authService : AuthenticationService,) { 

    this.login_clinician_form = form_builder.group({
      student_number : [''],
      password : [''],
    });

    this.login_instructor_form = form_builder.group({
      username : [''],
      password : [''],
    });

    this.login_patient_form = form_builder.group({
      username : [''],
      password : [''],
    });
  }

  ngOnInit() {

  }

  loginClinician(){
    this.submit_attempt = true;
    this.login_loader = true;

    let login_data = {
      'student_number' : this.login_clinician_form.value.student_number,
      'password' : this.login_clinician_form.value.password,
    }

    this.authService.loginAsClinician(login_data).then(res => {
      this.login_loader = false;
      this.success = true;
      this.back_to_selection();
      console.log(res);
    })
    .catch(error => {
      this.login_loader = false;
      this.success = false;
      this.loginErrorMessage();
      console.log(error);
    });
  }

  loginInstructor(){
    this.submit_attempt = true;
    this.login_loader = true;

    let login_data = {
      'username' : this.login_instructor_form.value.username,
      'password' : this.login_instructor_form.value.password,
    }

    this.authService.loginAsInstructor(login_data).then(res => {
      this.login_loader = false;
      this.success = true;
      this.back_to_selection();
      console.log(res);
    })
    .catch(error => {
      this.login_loader = false;
      this.success = false;
      this.loginErrorMessage();
      console.log(error);
    });
  }

  loginPatient(){
    this.submit_attempt = true;
    this.login_loader = true;

    let login_data = {
      'username' : this.login_patient_form.value.username,
      'password' : this.login_patient_form.value.password,
    }

    this.authService.loginAsPatient(login_data).then(res => {
      this.login_loader = false;
      this.success = true;
      this.back_to_selection();
      console.log(res);
    })
    .catch(error => {
      this.login_loader = false;
      this.success = false;
      this.loginErrorMessage();
      console.log(error);
    });
  }


  login_as_clinician(){
    this.clinician_login_form = true;
    this.selection_button = false;
  }

  login_as_clinician_instructor(){
    this.clinician_instructor_login_form = true;
    this.selection_button = false;
  }

  login_as_patient(){
    this.patient = true;
    this.selection_button = false;
  }

  back_to_selection(){
    this.clinician_login_form = false;
    this.clinician_instructor_login_form = false;
    this.patient = false;
    this.selection_button = true;
  }

  async presentToast() {
    const toast = await this.toast_controller.create({
      message: 'Please choose account type',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async loginErrorMessage() {
    const toast = await this.toast_controller.create({
      message: 'The password you entered is incorrect. Please try again.',
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  async presentAlertRadio() {
    const alert = await this.alert_controller.create({
      header: 'Sign Up',
      message: 'Choose your account type',
      cssClass: 'alert-radio',
      inputs: [
        {
          name: 'clinician',
          type: 'radio',
          label: 'Clinician',
          value: 'clinician',
        },
        {
          name: 'clinician_instructor',
          type: 'radio',
          label: 'Clinicial Instructor',
          value: 'clinician_instructor'
        },
        {
          name: 'patient',
          type: 'radio',
          label: 'Patient',
          value: 'patient'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data:string) => {
            if(data == 'clinician'){
              this.router.navigate(['registration-clinician']);
            }else if(data == 'clinician_instructor'){
              this.router.navigate(['registration-instructor']);
            }else if(data == 'patient'){
              this.router.navigate(['registration-patient']);
            }else{
              this.presentToast();
            }
          }
        }
      ]
    });
    await alert.present();
  }


}