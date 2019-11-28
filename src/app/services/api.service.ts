import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { reject } from 'q';
import { LoaderService } from '../services/loader.service';
import { LoadingController } from '@ionic/angular';
import { AlertController, ToastController} from '@ionic/angular';

// Typescript for search
export enum SearchType {
  all = '',
  patient = 'patient',
  instructor = 'instructor',
}

const http_options = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
 })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url = 'http://127.0.0.1:8000/';
  loading : any;

  constructor(private http_client : HttpClient,
              private loading_controller : LoadingController,
              private alert_controller : AlertController) { }
  
  /** Post data to dentistry api 
  * @param {data} personal information of clinician 
  */
  async post_register_clinician(data){
    const loading = await this.loading_controller.create({
      message: 'Loading',
      spinner : 'bubbles',
    });
    await loading.present();
 
    return new Promise(resolve=> {
      this.http_client.post(this.url+'register_as_clinician', JSON.stringify(data), http_options)
      .subscribe(res => {
        resolve(res);
        loading.dismiss();
        this.present_successful_registration_clinician();
      }), (err) => {
        reject(err);
        loading.dismiss();
      }
    });
  }

  async present_successful_registration_clinician() {
    const alert = await this.alert_controller.create({
      header: 'Registration Successful!',
      message: 'Congratulations! You are now successfully registered as clinician to App. You may now login your account.',
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async something_went_wrong(){
    const alert = await this.alert_controller.create({
      header: 'Something Went Wrong!',
      buttons: ['Ok'],
    });
    await alert.present();
  }
}