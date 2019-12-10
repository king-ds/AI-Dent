import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit {

  clinician : string;
  information = null;
  patient_id : string;

  constructor(private apiService : ApiService,
              private activatedRoute : ActivatedRoute,
              private router : Router,) { }

  ngOnInit() {
    this.getPatientDetails();
  }

  getPatientDetails(){
    this.patient_id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(this.patient_id);

    this.apiService.getPatientDetails(this.patient_id).subscribe(result => {
      this.information = result;
    });
  }

  goToComplaint(){
    let navigationExtras : NavigationExtras = {
      state : {
        patient : this.information
      }
    };

    this.router.navigate(['members', 'complaint'], navigationExtras);
  }

  goToMedicalHistory(){
    let navigationExtras : NavigationExtras = {
      state : {
        patient : this.information
      }
    };
    
    this.router.navigate(['members', 'medical-history'], navigationExtras);
  }
}