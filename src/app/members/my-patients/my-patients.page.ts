import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.page.html',
  styleUrls: ['./my-patients.page.scss'],
})
export class MyPatientsPage implements OnInit {

  results : Observable<any>;
  searchTerm : string = '';
  clinician : string;
  debouncer : any;
  loader : boolean;
  empty : boolean;

  constructor(private apiService : ApiService,
              private storageService : StorageService,) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.storageService.getObject('clinician').then((result) => {
        this.clinician = result;
        console.log(this.clinician);

      })
    }, 2000)

    this.debouncer = setTimeout(() => {
      this.checkMyPatient();
      this.loader = false;
    }, 3000)
  }

  searchChanged(){
    this.loader = true;
    console.log(this.searchTerm);
    this.results = this.apiService.searchMyPatient(this.searchTerm, this.clinician['id']);
    this.loader = false;
  }

  getMyPatient(){
    this.results = this.apiService.getMyPatient(this.clinician['id']);
    console.log(this.results);
  }

  checkMyPatient(){
    this.apiService.getMyPatient(this.clinician['id']).subscribe(val => {
      if(val == ''){
        this.empty = true;
      }else{
        console.log(val)
        this.empty = false;
        this.getMyPatient();
      }
    });
  }

  trackRecord(){
  }
}