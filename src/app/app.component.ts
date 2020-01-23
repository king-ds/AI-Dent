import { Router } from '@angular/router';
import { AuthenticationService } from '../app/services/authentication.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash : boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService : AuthenticationService,
    private router : Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      setTimeout(() => {
        this.authenticationService.authenticationState.subscribe(state => {
          if(state){
            console.log(state)
            this.authenticationService.isClinician.subscribe(clinician => {
              if(clinician){
                this.router.navigate(['members', 'menu', 'clinician-dashboard']);
                this.showSplash = false;
              }
            });
            this.authenticationService.isInstructor.subscribe(instructor => {
              if(instructor){
                this.router.navigate(['members', 'instructor-dashboard']);
                this.showSplash = false;
              }
            });
            this.authenticationService.isPatient.subscribe(patient => {
              if(patient){
                this.router.navigate(['members', 'patient-dashboard', 'patient-track-records']);
                this.showSplash = false;
              }
            });
          } else {
            this.router.navigate(['login']);
            this.showSplash = false;
            console.log('User has not authenticated yet.')
          }
        });
      }, 4000)
    });
  }
}
