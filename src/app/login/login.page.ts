import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  clinician_login_form = false;
  clinician_instructor_login_form = false;
  patient = false;
  selection_button = true;

  constructor(public alert_controller : AlertController,
              private router: Router,
              public toast_controller : ToastController) { }

  ngOnInit() {
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