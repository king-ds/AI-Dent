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
  loader : boolean = false;
  empty : boolean;

  constructor(private apiService : ApiService,
              private storageService : StorageService,
              private router : Router,) { }

  ngOnInit() {
      this.storageService.getObject('clinician').then((result) => {
      this.clinician = result;
      console.log(this.clinician);
      this.loader = true;

      this.debouncer = setTimeout(() => {
        this.checkMyPatient();
        this.loader = false;
      }, 2000)
    });
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
        this.empty = false;
        this.getMyPatient();
      }
    });
  }

  trackRecord(){
  }
}