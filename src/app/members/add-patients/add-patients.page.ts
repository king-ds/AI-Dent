import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.page.html',
  styleUrls: ['./add-patients.page.scss'],
})
export class AddPatientsPage implements OnInit {

  results : Observable<any>;
  searchTerm : string = '';
  debouncer : any;
  loader : boolean = true;

  constructor(private apiService : ApiService) { }

  ngOnInit() {

    this.debouncer = setTimeout(() => {
      this.getPatientList();
      this.loader = false;
    }, 2000)
  }

  searchChanged(){
    this.results = this.apiService.searchPatient(this.searchTerm);
  }

  getPatientList(){
    this.results = this.apiService.getPatientList();
    console.log(this.results);
  }
}
