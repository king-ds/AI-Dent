import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Observable } from 'rxjs';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-instructor-viewer',
  templateUrl: './instructor-viewer.page.html',
  styleUrls: ['./instructor-viewer.page.scss'],
})
export class InstructorViewerPage implements OnInit {

  clinician : any;
  instructors : Observable<any>;
  searchTerm : string = '';
  debouncer : any;
  loader : boolean;
  empty : boolean;

  constructor(private apiService : ApiService,
              private storageService : StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.storageService.getObject('clinician').then((result) => {
      this.clinician = result;
      console.log(this.clinician);
      
      this.debouncer = setTimeout(() => {
          this.checkInstructorList();
          this.loader = false;
        }, 2000)
      });
  }

  checkInstructorList(){
    this.apiService.getInstructorList().subscribe(val => {
      if(val == ''){
        this.empty = true;
      }else{
        this.empty = false;
        this.instructors = this.apiService.getInstructorList();
      }
    })
  }

  searchChanged(){
    this.instructors = this.apiService.searchPatient(this.searchTerm);
  }

}
