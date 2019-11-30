import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { reject, resolve } from 'q';
import { map } from "rxjs/operators";
import { LoadingController } from '@ionic/angular';
import { AlertController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';

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
              private alert_controller : AlertController,
              private router: Router) { }

  async post_register_clinician(data){
    const loading = await this.loading_controller.create({
      message: 'Loading',
      spinner : 'bubbles',
    });
    await loading.present();
 
    return new Promise(resolve=> {
      this.http_client.post(this.url+'register/clinician', JSON.stringify(data), http_options)
      .subscribe(res => {
        resolve(res);
        loading.dismiss();
        this.present_successful_registration_clinician();
      },
      (error) => {
        reject(error);
        this.present_something_went_wrong();
        loading.dismiss();
      })
    });
  }
  async post_register_clinical_instructor(data){
    const loading = await this.loading_controller.create({
      message: 'Loading',
      spinner : 'bubbles',
    });
    await loading.present();
 
    return new Promise(resolve=> {
      this.http_client.post(this.url+'register/instructor', JSON.stringify(data), http_options)
      .subscribe(res => {
        resolve(res);
        loading.dismiss();
        this.present_successful_registration_clinical_instructor();
      },
      (error) => {
        reject(error);
        this.present_something_went_wrong();
        loading.dismiss();
      })
    });
  }
  async post_register_patient(data){
    const loading = await this.loading_controller.create({
      message: 'Loading',
      spinner : 'bubbles',
    });
    await loading.present();
 
    return new Promise(resolve=> {
      this.http_client.post(this.url+'register/patient', JSON.stringify(data), http_options)
      .subscribe(res => {
        resolve(res);
        console.log(res);
        loading.dismiss();
        this.present_successful_registration_patient();
      },
      (error) => {
        console.log(error);
        reject(error);
        this.present_something_went_wrong();
        loading.dismiss();
      })
    });
  }

  async present_successful_registration_clinical_instructor() {
    const alert = await this.alert_controller.create({
      header: 'Registration Successful!',
      message: 'Congratulations! You are now successfully registered as clinical instructor to App Name. You may now login your account.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.router.navigate(['login']);
        }
      }],
    });
    await alert.present();
  }

  async present_successful_registration_clinician() {
    const alert = await this.alert_controller.create({
      header: 'Registration Successful!',
      message: 'Congratulations! You are now successfully registered as clinician to App Name. You may now login your account.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.router.navigate(['login']);
        }
      }],
    });
    await alert.present();
  }

  async present_successful_registration_patient() {
    const alert = await this.alert_controller.create({
      header: 'Registration Successful!',
      message: 'Congratulations! You are now successfully registered as patient to App Name. You may now login your account.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.router.navigate(['login']);
        }
      }],
    });
    await alert.present();
  }

  async present_something_went_wrong(){
    const alert = await this.alert_controller.create({
      header: 'Something Went Wrong!',
      message : 'Sorry for inconvience please check your internet connection and try again.',
      buttons: ['Ok'],
    });
    await alert.present();
  }

  validate_student_number(student_number){
    return this.http_client.get(this.url+'clinicians/'+student_number).pipe(map(res => res));
  }

  validate_username(username){
    return this.http_client.get(this.url+'clinical-instructors/'+username).pipe(map(res => res));
  }

  validate_patient_username(username){
    return this.http_client.get(this.url+'patients/'+username).pipe(map(res => res));
  }
}