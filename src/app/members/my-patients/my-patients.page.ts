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

  constructor(private apiService : ApiService,
              private storageService : StorageService,
              private router : Router,) { }

  ngOnInit() {
      this.storageService.getObject('clinician').then((result) => {
      this.clinician = result['id'];
      console.log(this.clinician);
      this.loader = true;

      this.debouncer = setTimeout(() => {
        this.getMyPatient();
        this.loader = false;
      }, 2000)
    });
  }

  searchChanged(){
    this.loader = true;
    this.results = this.apiService.searchMyPatient(this.searchTerm, this.clinician);
    this.loader = false;
  }

  getMyPatient(){
    this.results = this.apiService.getMyPatient(this.clinician);
  }

  trackRecord(){
  }
}