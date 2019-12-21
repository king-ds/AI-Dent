import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.page.html',
  styleUrls: ['./instructor-dashboard.page.scss'],
})
export class InstructorDashboardPage implements OnInit {

  debouncer : any;

  constructor(private authService : AuthenticationService,
              private storageService : StorageService,) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logoutInstructor();
  }

  getUserDetails(){
    this.debouncer = setTimeout(() => {
      this.storageService.getObject('patient').then(result => {
        console.log(result);
      })
    }, 2000)
  }
}
