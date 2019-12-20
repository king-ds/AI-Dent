import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.page.html',
  styleUrls: ['./instructor-details.page.scss'],
})
export class InstructorDetailsPage implements OnInit {

  loader : any;
  debouncer : any;
  instructor : any;

  constructor(private activatedRoute : ActivatedRoute,
              private apiService : ApiService,) { }

  ngOnInit() {
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.getInstructorDetails();
      this.loader = false;
    }, 2000)
  }

  getInstructorDetails(){
    let instructor_id = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getInstructorDetails(instructor_id).subscribe(result => {
      console.log(result);
      this.instructor = result;
    });
  }
}
