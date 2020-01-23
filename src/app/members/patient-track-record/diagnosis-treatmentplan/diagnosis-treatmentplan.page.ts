import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-diagnosis-treatmentplan',
  templateUrl: './diagnosis-treatmentplan.page.html',
  styleUrls: ['./diagnosis-treatmentplan.page.scss'],
})
export class DiagnosisTreatmentplanPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isEmptyDiagnosis : boolean;
  isEmptyTreatmentPlan : boolean;

  diagnosis : Observable<any>;
  treatmentPlan : Observable<any>;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.treatmentPlan = this.apiService.getTreatmentPlan(this.track_record['id']);
      this.treatmentPlan.subscribe(val => {
        console.log(val);
        if(val == ''){
          this.isEmptyTreatmentPlan = true;
        }else{
          this.isEmptyTreatmentPlan = false;
        }
      });
      this.diagnosis = this.apiService.getDiagnosis(this.track_record['id']);
      this.diagnosis.subscribe(val => {
        console.log(val);
        if(val == ''){
          this.isEmptyDiagnosis = true;
        }else{
          this.isEmptyDiagnosis = false;
        }
      });
      this.loader = false;
    }, 2000)
  }
}