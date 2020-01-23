import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { StorageService } from './../../services/storage.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.page.html',
  styleUrls: ['./instructor-dashboard.page.scss'],
})
export class InstructorDashboardPage implements OnInit {

  debouncer : any;
  cdarCount : any;
  trackRecordCount : any;

  constructor(private authService : AuthenticationService,
              private storageService : StorageService,
              private apiService : ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    var instructorId: string;
    setTimeout(() => {
      setInterval(() => {
        this.cdarCount = 0;
        this.storageService.getObject('instructor').then((result) => {
          instructorId = result['id'];
          this.apiService.getInstructorAllCdar(instructorId).subscribe((res) => {
            var cdarJson = JSON.parse(JSON.stringify(res));
            for(var i=0; i<cdarJson.length; i++){
              if(cdarJson[i]['pending_for_approval']){
                this.cdarCount++
              }
            }
          })
        })
      }, 1000)

      setInterval(() => {
        var instructorId: string;
        this.trackRecordCount = 0;
        this.storageService.getObject('instructor').then((result) => {
          instructorId = result['id'];
          this.apiService.getInstructorTrackRecord(instructorId).subscribe((res) => {
            var trackRecordJson = JSON.parse(JSON.stringify(res));
            for(var i=0; i<trackRecordJson.length; i++){
              if(trackRecordJson[i]['pending_for_approval']){
                this.trackRecordCount++
              }
            }
          })
        })
      }, 1000)
    }, 2000)
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