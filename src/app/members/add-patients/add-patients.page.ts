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

  constructor(private apiService : ApiService) { }

  ngOnInit() {
  }

  searchChanged(){
    this.results = this.apiService.searchPatient(this.searchTerm);
  }
}
