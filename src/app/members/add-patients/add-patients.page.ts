import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Observable } from 'rxjs';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.page.html',
  styleUrls: ['./add-patients.page.scss'],
})
export class AddPatientsPage implements OnInit {

  results : Observable<any>;
  clinician : string;
  searchTerm : string = '';
  debouncer : any;
  loader : boolean;
  empty : boolean;

  constructor(private apiService : ApiService,
              private storageService : StorageService) { }

  ngOnInit() {
  }

  /* This page will start by checking the available patient. */
  ionViewWillEnter(){
    this.loader = true;
    this.storageService.getObject('clinician').then((result) => {
      this.clinician = result;
      console.log(this.clinician);
      
      this.debouncer = setTimeout(() => {
          this.checkPatientList();
          this.loader = false;
        }, 2000)
      });
  }

  /* Function for searching specific patient. */
  searchChanged(){
    this.results = this.apiService.searchPatient(this.searchTerm);
  }

  /* Function for checking the list of available/released patient. */
  checkPatientList(){
    this.apiService.getPatientList().subscribe(val => {
      if(val == ''){
        this.empty = true;
      }else{
        this.getPatientList();
      }
    });
  }

  /* Function for getting the available patient. */
  getPatientList(){
    this.empty = false;
    this.results = this.apiService.getPatientList();
  }

  /* Refresh function */
  doRefresh(event){
    setTimeout(() => {
      this.checkPatientList();
      event.target.complete();
    }, 2000);
  }
}
