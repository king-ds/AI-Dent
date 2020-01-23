import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
 })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // url = 'http://127.0.0.1:8000/';
  // url = 'http://192.168.0.107:8000/';
  url = 'http://54.250.113.39/';
  
  public success : boolean = false;
  debouncer : any;

  authenticationState = new BehaviorSubject(false);
  isClinician = new BehaviorSubject(false);
  isInstructor = new BehaviorSubject(false);
  isPatient = new BehaviorSubject(false);

    constructor(private storage : Storage, 
                private plt : Platform,
                private httpClient : HttpClient,
                private storageService : StorageService,
                ) {
      this.plt.ready().then(() =>{
        this.checkClinicianToken();
        this.checkPatientToken();
        this.checkInstructorToken();
      })
    }

  checkClinicianToken(){
    this.storage.get('auth-clinician').then(res => {
      if(res){
        this.authenticationState.next(true);
        this.isClinician.next(true);
      }
    })
  }

  checkPatientToken(){
    this.storage.get('auth-patient').then(res => {
      if(res){
        this.authenticationState.next(true);
        this.isPatient.next(true);
      }
    })
  }

  checkInstructorToken(){
    this.storage.get('auth-instructor').then(res => {
      if(res){
        this.authenticationState.next(true);
        this.isInstructor.next(true);
      }
    })
  }

  loginAsClinician(data) {
    return this.httpClient.post(this.url+'authenticate/clinicians', JSON.stringify(data), httpOptions)
    .pipe( tap(res => {
      this.storage.set('auth-clinician', res['token']).then(() => {
        this.success = true;
        this.authenticationState.next(true);
        this.isClinician.next(true);
        this.storageService.setObject('clinician', res);
        })
      })
    )
    .toPromise();
  }

  loginAsInstructor(data) {
    return this.httpClient.post(this.url+'authenticate/instructors', JSON.stringify(data), httpOptions)
    .pipe( tap(res => {
      this.storage.set('auth-instructor', res['token']).then(() => {
        this.success = true;
        this.authenticationState.next(true);
        this.isInstructor.next(true);
        this.storageService.setObject('instructor', res);
        })
      })
    )
    .toPromise();
  }

  loginAsPatient(data) {
    return this.httpClient.post(this.url+'authenticate/patients', JSON.stringify(data), httpOptions)
    .pipe( tap(res => {
      this.storage.set('auth-patient', res['token']).then(() => {
        this.success = true;
        this.authenticationState.next(true);
        this.isPatient.next(true);
        this.storageService.setObject('patient', res);
        })
      })
    )
    .toPromise();
  }

  logoutClinician(){
    return this.storage.remove('auth-clinician').then(() => {
      this.authenticationState.next(false);
      this.isClinician.next(false);
      this.storageService.remove('clinician');
    })
  }

  logoutPatient(){
    return this.storage.remove('auth-patient').then(() => {
      this.authenticationState.next(false);
      this.isPatient.next(false);
      this.storageService.remove('patient');
    })
  }

  logoutInstructor(){
    return this.storage.remove('auth-instructor').then(() => {
      this.authenticationState.next(false);
      this.isInstructor.next(false);
      this.storageService.remove('instructor');
    })
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }
}
