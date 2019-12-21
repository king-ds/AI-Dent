import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.page.html',
  styleUrls: ['./patient-dashboard.page.scss'],
})
export class PatientDashboardPage implements OnInit {

  first_name : string;
  last_name : string;
  student_number : string;
  debouncer : any;

  constructor(private authService : AuthenticationService,
              private storageService : StorageService,) { }

  ngOnInit() {
    this.getUserDetails();
  }

  logout(){
    this.authService.logoutPatient();
  }

  getUserDetails(){
    this.debouncer = setTimeout(() => {
      this.storageService.getObject('patient').then(result => {
        console.log(result);
      })
    }, 2000)
  }
}