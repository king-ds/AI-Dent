import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinician-dashboard',
  templateUrl: './clinician-dashboard.page.html',
  styleUrls: ['./clinician-dashboard.page.scss'],
})
export class ClinicianDashboardPage implements OnInit {

  first_name : string;
  last_name : string;
  student_number : string;
  debouncer : any;

  constructor(private authService : AuthenticationService,
              private storageService : StorageService,
              private router : Router) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    this.debouncer = setTimeout(() =>{
      this.storageService.getObject('clinician').then(result => {
        this.first_name = result['first_name'];
        this.last_name = result['id'];
        this.student_number = result['student_number'];
      })
    }, 2000);
  }
}