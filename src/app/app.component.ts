import { Router } from '@angular/router';
import { AuthenticationService } from '../app/services/authentication.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

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

      this.authenticationService.authenticationState.subscribe(state => {
        if(state){
          console.log(state)
          this.authenticationService.isClinician.subscribe(clinician => {
            if(clinician){
              this.router.navigate(['members', 'menu', 'clinician-dashboard']);
              console.log('clinician')
            }
          });
          this.authenticationService.isInstructor.subscribe(instructor => {
            if(instructor){
              this.router.navigate(['members', 'instructor-dashboard'])
              console.log('instructor')
            }
          });
          this.authenticationService.isPatient.subscribe(patient => {
            if(patient){
              this.router.navigate(['members', 'patient-dashboard'])
              console.log('patient')
            }
          });
        } else {
          this.router.navigate(['login']);
          console.log('User has not authenticated yet.')
        }
      });
    });
  }
}
