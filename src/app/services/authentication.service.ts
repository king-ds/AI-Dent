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

  url = 'http://127.0.0.1:8000/';
  // url = 'http://192.168.43.37:8000/';
  // url = 'http://192.168.0.106:8000/';
  // url = 'http://192.168.0.104:8000/';
  
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
        this.checkToken();
      })
    }

  checkToken(){
    this.storage.get('token').then(res => {
      if(res){
        console.log(res);
        this.authenticationState.next(true);
      }
    })
  }

  loginAsClinician(data) {
    return this.httpClient.post(this.url+'authenticate/clinicians', JSON.stringify(data), httpOptions)
    .pipe( tap(res => {
      // this.storageService.storage.clear();
      this.success = true;
      this.authenticationState.next(true);
      this.isClinician.next(true);
      // Save clinician details to data storage
      this.storageService.setObject('clinician', res);
      // var resKeys = Object.keys(res);
      // for( var i in resKeys ){
      //   this.storage.set(resKeys[i], res[resKeys[i]]);
      // }
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
        // Save instructor details to data storage
        var resKeys = Object.keys(res);
        for( var i in resKeys ){
          this.storage.set(resKeys[i], res[resKeys[i]]);
        }
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
        // Save instructor details to data storage
        this.storageService.setObject('patient', res);
        // var resKeys = Object.keys(res);
        // for( var i in resKeys ){
        //   this.storage.set(resKeys[i], res[resKeys[i]]);
        // }
      })

    )
    .toPromise();
  }

  logoutAnyUser(){
    return this.storage.remove('token').then(() => {
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
