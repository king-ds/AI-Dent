import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
 })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = 'http://127.0.0.1:8000/';
  public success : boolean = false;

  authenticationState = new BehaviorSubject(false);
  isClinician = new BehaviorSubject(false);
  isInstructor = new BehaviorSubject(false);
  isPatient = new BehaviorSubject(false);

    constructor(private storage : Storage, 
                private plt : Platform,
                private httpClient : HttpClient) {
      this.plt.ready().then(() =>{
        this.checkId();
      })
    }

  checkId(){
    this.storage.get('id').then(res => {
      if(res){
        this.authenticationState.next(true);
      }
    })
  }

  loginAsClinician(data) {
    return this.httpClient.post(this.url+'authenticate/clinicians', JSON.stringify(data), httpOptions)
    .pipe( tap(res => {
        this.success = true;
        this.authenticationState.next(true);
        this.isClinician.next(true);
      })
    )
    .toPromise();
  }

  loginAsInstructor(data) {
    return this.httpClient.post(this.url+'authenticate/instructors', JSON.stringify(data), httpOptions)
    .pipe( tap(res => {
        this.success = true;
        this.authenticationState.next(true);
        this.isInstructor.next(true);
      })
    )
    .toPromise();
  }

  loginAsPatient(data) {
    return this.httpClient.post(this.url+'authenticate/patients', JSON.stringify(data), httpOptions)
    .pipe( tap(res => {
        this.success = true;
        this.authenticationState.next(true);
        this.isPatient.next(true);
        console.log(res);
      })
    )
    .toPromise();
  }

  logoutAnyUser(){
    return this.storage.remove('id').then(() => {
      this.authenticationState.next(false);
      this.isPatient.next(false);
      this.isClinician.next(false);
      this.isInstructor.next(false);
    });
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }
}
