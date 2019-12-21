import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oral-assessment',
  templateUrl: './oral-assessment.page.html',
  styleUrls: ['./oral-assessment.page.scss'],
})
export class OralAssessmentPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  oralAssessment : any;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
        console.log(this.track_record);
        }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.oralAssessment = this.track_record['oral_assessment'];
      this.loader = false;
    }, 2000)
  }
}