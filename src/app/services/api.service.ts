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
  // url = 'http://54.250.113.39/';
  
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

 getAllergies(track_record){
   return this.http_client.get(this.url+'track-record/'+track_record).pipe(
     map ( results => results['allergy'])
   )
 }

 getTrackRecord(track_record){
   return this.http_client.get(this.url+'track-record/'+track_record).pipe(
     map ( results => results)
   )
 }

 getVitalSign(track_record){
   return this.http_client.get(this.url+'track-record/vital-sign/'+track_record).pipe(
     map ( results => results)
   )
 }

 getTreatmentRecord(track_record){
   return this.http_client.get(this.url+'track-record/treatment-record/'+track_record).pipe(
     map ( results => results)
   )
 }

 getDentalChart(track_record){
   return this.http_client.get(this.url+'track-record/dental-chart/'+track_record).pipe(
     map ( results => results)
   )
 }

 getDentalChartQ1(track_record){
   return this.http_client.get(this.url+'track-record/dental-chart-q1/'+track_record).pipe(
     map ( results => results)
   )
 }

 getDentalChartQ2(track_record){
  return this.http_client.get(this.url+'track-record/dental-chart-q2/'+track_record).pipe(
    map ( results => results)
  )
}

getDentalChartQ3(track_record){
  return this.http_client.get(this.url+'track-record/dental-chart-q3/'+track_record).pipe(
    map ( results => results)
  )
}

getDentalChartQ4(track_record){
  return this.http_client.get(this.url+'track-record/dental-chart-q4/'+track_record).pipe(
    map ( results => results)
  )
}

 getFemale(track_record){
   return this.http_client.get(this.url+'track-record/'+track_record).pipe(
     map (results => results['female'])
   )
}

getOralAssessment(track_record){
  return this.http_client.get(this.url+'track-record/'+track_record).pipe(
    map (results => results['oral_assessment'])
  )
}

getSocialHistory(track_record){
  return this.http_client.get(this.url+'track-record/'+track_record).pipe(
    map (results => results['social_history'])
  )
}

getDentalHistory(track_record){
  return this.http_client.get(this.url+'track-record/'+track_record).pipe(
    map (results => results['dental_history'])
  )
}

getOcclusion(track_record){
  return this.http_client.get(this.url+'track-record/'+track_record).pipe(
    map (results => results['occlusion'])
  )
}

getGingiva(track_record){
  return this.http_client.get(this.url+'track-record/'+track_record).pipe(
    map (results => results['gingiva'])
  )
}


  /*
  * UPDATE TRACK RECORD
  */

  updateTrackRecord(data, track_record){
    return this.http_client.put(this.url+'update/track-record/'+track_record, JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }
  
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

  updateAllergies(data, track_record){
    return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  updateFemale(data, track_record){
    return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  updateOralAssessment(data, track_record){
    return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  updateSocialHistory(data, track_record){
    return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  updateDentalHistory(data, track_record){
    return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  updateOcclusion(data, track_record){
    return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  updateGingiva(data, track_record){
    return this.http_client.put(this.url+'track-record/'+track_record+'/', JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  updateDentalChart(data, dental_chart){
    return this.http_client.patch(this.url+'track-record/dental-chart-detail/'+dental_chart, JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  updateTreatmentRecord(data, treatment_record){
    return this.http_client.patch(this.url+'track-record/treatment-record-detail/'+treatment_record, JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    ).toPromise();
  }

  updateCDAR(data, cdar){
    return this.http_client.patch(this.url+'track-record/cdar-detail/'+cdar, JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    ).toPromise();
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

 addTreatmentRecord(data){
   return this.http_client.post(this.url+'track-record/treatment-record', JSON.stringify(data), http_options)
   .pipe( tap ( res=> {
     console.log(res);
   })
   )
   .toPromise();
 }

 addDentalChart(data){
   return this.http_client.post(this.url+'track-record/dental-chart', JSON.stringify(data), http_options)
   .pipe( tap ( res => {
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

 addFemale(data){
   return this.http_client.post(this.url+'track-record/female', JSON.stringify(data), http_options)
   .pipe( tap(res => {
     console.log(res);
   })
   )
   .toPromise();
 }

 addOralAssessment(data){
   return this.http_client.post(this.url+'track-record/oral-assessment', JSON.stringify(data), http_options)
   .pipe( tap(res => {
     console.log(res);
   })
   )
   .toPromise();
 }

 addSocialHistory(data){
   return this.http_client.post(this.url+'track-record/social-history', JSON.stringify(data), http_options)
   .pipe( tap(res => {
     console.log(res);
   })
   )
   .toPromise();
 }

 addOcclusion(data){
  return this.http_client.post(this.url+'track-record/occlusion', JSON.stringify(data), http_options)
  .pipe( tap(res => {
    console.log(res);
  })
  )
  .toPromise();
}

addGingiva(data){
  return this.http_client.post(this.url+'track-record/gingiva', JSON.stringify(data), http_options)
  .pipe( tap(res => {
    console.log(res);
  })
  )
  .toPromise();
}

 addDentalHistory(data){
  return this.http_client.post(this.url+'track-record/dental-history', JSON.stringify(data), http_options)
  .pipe( tap(res => {
    console.log(res);
  })
  )
  .toPromise();
}

addCDAR(data){
  return this.http_client.post(this.url+'track-record/cdar', JSON.stringify(data), http_options)
  .pipe( tap(res => {
    console.log(res);
  })
  ).toPromise();
}

 deleteVitalSign(vitalSignId){
   return this.http_client.delete(this.url+'track-record/vital-sign-detail/'+vitalSignId, http_options)
   .pipe( tap(res => {
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

  myPatientList(clinician_id : string){
    return this.http_client.get(this.url+'my-patients-list/'+clinician_id).pipe(
      map(results => results)
    )
  }

  updatePatient(id, data){
    return this.http_client.patch(this.url+'update/patient-details/'+id, JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  /*
  * CLINICIAN
  */
  searchClinician(title : string) : Observable<any> {
    return this.http_client.get(this.url+'clinician-list/?search='+title).pipe(
      map(results => results)
    )
  }

  getClinicianList(){
    return this.http_client.get(this.url+'clinician-list/').pipe(
      map(results => results)
    )
  }

  getClinicianDetails(id){
    return this.http_client.get(this.url+'clinician-list/'+id);
  }

  updateClinician(id, data){
    return this.http_client.patch(this.url+'update/clinician-details/'+id, JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  getTodayCdar(id){
    return this.http_client.get(this.url+'track-record/clinician-today-cdar/'+id).pipe(
      map(results => results)
    )
  }

  getAllCdar(id){
    return this.http_client.get(this.url+'track-record/clinician-all-cdar/'+id).pipe(
      map(results => results)
    )
  }

  searchTodayCdar(title : string, clinician_id : string) : Observable<any> {
    return this.http_client.get(this.url+'track-record/clinician-today-cdar/'+clinician_id+'?search='+title).pipe(
      map(results => results)
    )
  }

  searchAllCdar(title : string, clinician_id : string) : Observable<any> {
    return this.http_client.get(this.url+'track-record/clinician-all-cdar/'+clinician_id+'?search='+title).pipe(
      map(results => results)
    )
  }

  /*
  * INSTRUCTOR
  */
 searchInstructor(title : string) : Observable<any> {
  return this.http_client.get(this.url+'instructor-list/?search='+title).pipe(
    map(results => results)
    )
  }

  getInstructorList(){
    return this.http_client.get(this.url+'instructor-list/').pipe(
      map(results => results)
    )
  }

  getInstructorDetails(id){
    return this.http_client.get(this.url+'instructor-list/'+id);
  }

  getInstructorTrackRecord(id){
    return this.http_client.get(this.url+'track-record/instructor-track-records/'+id);
  }

  searchInstructorTrackRecord(title : string, instructor_id : string) : Observable<any> {
    return this.http_client.get(this.url+'track-record/instructor-track-records/'+instructor_id+'?search='+title).pipe(
      map(results => results)
    )
  }

  getInstructorTodayCdar(id){
    return this.http_client.get(this.url+'track-record/instructor-today-cdar/'+id).pipe(
      map(results => results)
    )
  }

  getInstructorAllCdar(id){
    return this.http_client.get(this.url+'track-record/instructor-all-cdar/'+id).pipe(
      map(results => results)
    )
  }

  searchInstructorTodayCdar(title : string, clinician_id : string) : Observable<any> {
    return this.http_client.get(this.url+'track-record/instructor-today-cdar/'+clinician_id+'?search='+title).pipe(
      map(results => results)
    )
  }

  searchInstructorAllCdar(title : string, clinician_id : string) : Observable<any> {
    return this.http_client.get(this.url+'track-record/instructor-all-cdar/'+clinician_id+'?search='+title).pipe(
      map(results => results)
    )
  }

  updateInstructor(id, data){
    return this.http_client.patch(this.url+'update/instructor-details/'+id, JSON.stringify(data), http_options)
    .pipe( tap(res => {
      console.log(res);
    })
    )
    .toPromise();
  }

  /*
  * PATIENT
  */

  getMyTrackRecord(patient_id){
    return this.http_client.get(this.url+'track-record-list/'+patient_id).pipe(
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