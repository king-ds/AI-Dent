import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reject, resolve } from 'q';
import { map, tap } from "rxjs/operators";
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
  // url = 'http://192.168.0.106:8000/';
  loading : any;
  public success : boolean = false;

  constructor(private http_client : HttpClient,
              private loading_controller : LoadingController,
              private alert_controller : AlertController,
              private router: Router) { }

  /*
  * GET TRACK RECORD
  */
 getComplaint(track_record){
   return this.http_client.get(this.url+'track-record/'+track_record).pipe(
     map( results => results['additional_personal_data'] )
   )
 }

 getMedicalHistory(track_record){
   return this.http_client.get(this.url+'track-record/'+track_record).pipe(
     map ( results => results['medical_history'])
   )
 }

 getMedicalHealthQuestionnaire(track_record){
   return this.http_client.get(this.url+'track-record/'+track_record).pipe(
     map ( results => results['medical_health_questionnaire'])
   )
 }

  /*
  * UPDATE TRACK RECORD
  */
 updateComplaint(data, track_record){
   return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
   .pipe( tap(res =>{
     console.log(res);
   })
   )
   .toPromise();
 }

 updateMedicalHistory(data, track_record){
   return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
   .pipe( tap(res => {
     console.log(res);
   })
   )
   .toPromise();
 }

 updateMedicalHealthQuestionnaire(data, track_record){
  return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
  .pipe( tap(res => {
    console.log(res);
  })
  )
  .toPromise(); 
 }
  
  /*
  * SETUP TRACK RECORD
  */
 addComplaint(data){
   return this.http_client.post(this.url+'track-record/additional-personal-data', JSON.stringify(data),http_options)
   .pipe( tap(res => {
     console.log(res);
    })
   )
  .toPromise();
 }

 addMedicalHistory(data){
  return this.http_client.post(this.url+'track-record/medical-history', JSON.stringify(data),http_options)
  .pipe( tap(res => {
    console.log(res);
   })
  )
 .toPromise();
 }

 addMedicalHistoryQuestionnaire(data){
   return this.http_client.post(this.url+'track-record/medical-history-questionnaire', JSON.stringify(data), http_options)
   .pipe( tap ( res =>{
     console.log(res);
    })
   )
   .toPromise();
 }

 addVitalSign(data){
  return this.http_client.post(this.url+'track-record/vital-sign', JSON.stringify(data), http_options)
  .pipe( tap ( res =>{
    console.log(res);
   })
  )
  .toPromise();
 }

 addTrackRecord(data){
   return this.http_client.post(this.url+'track-record/track-record',JSON.stringify(data), http_options)
   .pipe( tap(res =>{
     console.log(res);
    })
   )
   .toPromise();
 }

 addAllergies(data){
  return this.http_client.post(this.url+'track-record/allergies',JSON.stringify(data), http_options)
  .pipe( tap(res =>{
    console.log(res);
   })
  )
  .toPromise();
 }
  /*
  * ADD PATIENT
  */

  searchPatient(title : string) : Observable<any> {
    return this.http_client.get(this.url+'patients-list/?search='+title).pipe(
      map(results => results)
    )
  }

  getPatientList(){
    return this.http_client.get(this.url+'patients-list/').pipe(
      map(results => results)
    )
  }

  searchMyPatient(title : string, clinician_id : string) : Observable<any> {
    return this.http_client.get(this.url+'my-patients-list/'+clinician_id+'?search='+title).pipe(
      map(results => results)
    )
  }

  getMyPatient(clinician_id : string){
    return this.http_client.get(this.url+'my-patients-list/'+clinician_id).pipe(
      map(results => results)
    )
  }

  getPatientDetails(id){
    return this.http_client.get(this.url+'patients-list/'+id);
  }

  addPatient(id, data){
    return this.http_client.put(this.url+'update/patient/'+id, JSON.stringify(data),http_options)
    .pipe( tap(res => {
      console.log(res);
      })
    )
    .toPromise();
  }

  // addAdditionalData(data){
  //   this.success = false;
  //   return this.http_client.post(this.url+'add/additional-personal-data', JSON.stringify(data), http_options)
  //   .pipe( tap(res => {
  //       this.success = true;
  //       console.log(res);
  //     })
  //   )
  //   .toPromise();
  // }

  myPatientList(clinician_id : string){
    return this.http_client.get(this.url+'my-patients-list/'+clinician_id).pipe(
      map(results => results)
    )
  }

  /*
  * REGISTRATION
  */
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

  /*
  * LOGIN
  */
  loginAsClinician(data){
    this.success = false;
    return this.http_client.post(this.url+'authenticate/clinicians', JSON.stringify(data), http_options)
    .pipe( tap(res => {
        this.success = true;
        console.log(res);
      })
    )
    .toPromise();
  }

  /*
  * MESSAGE ALERT
  */
  async present_successful_registration_clinical_instructor() {
    const alert = await this.alert_controller.create({
      header: 'Registration Successful!',
      message: 'Congratulations! You are now successfully registered as clinical instructor to A.I. Dent. You may now login your account.',
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
      message: 'Congratulations! You are now successfully registered as clinician to A.I. Dent. You may now login your account.',
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
      message: 'Congratulations! You are now successfully registered as patient to A.I. Dent. You may now login your account.',
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

  /* 
  * Validators
  */
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