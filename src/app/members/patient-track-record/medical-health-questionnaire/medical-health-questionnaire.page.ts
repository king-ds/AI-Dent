import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medical-health-questionnaire',
  templateUrl: './medical-health-questionnaire.page.html',
  styleUrls: ['./medical-health-questionnaire.page.scss'],
})
export class MedicalHealthQuestionnairePage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : boolean;

  medicalHealthQuestionnaire : any;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.medicalHealthQuestionnaire = this.track_record[0]['medical_health_questionnaire']
      this.loader = false;
    }, 2000)
  }
}