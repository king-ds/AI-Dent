import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-registration-instructor',
  templateUrl: './registration-instructor.page.html',
  styleUrls: ['./registration-instructor.page.scss'],
})
export class RegistrationInstructorPage implements OnInit {

  check_check_box = false
  constructor(public alert_controller: AlertController) { }

  ngOnInit() {
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
