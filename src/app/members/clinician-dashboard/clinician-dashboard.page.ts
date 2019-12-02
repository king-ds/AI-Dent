import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-clinician-dashboard',
  templateUrl: './clinician-dashboard.page.html',
  styleUrls: ['./clinician-dashboard.page.scss'],
})
export class ClinicianDashboardPage implements OnInit {

  constructor(private authService : AuthenticationService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logoutAnyUser();
  }


}
