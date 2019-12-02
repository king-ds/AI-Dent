import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {

  information = null;

  constructor(private activatedRoute : ActivatedRoute,
              private apiService : ApiService,) { }

  ngOnInit() {
    let patient_id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(patient_id);

    this.apiService.getPatientDetails(patient_id).subscribe(result => {
      this.information = result;
    });
  }

  addPatient(){
    console.log(this.information['id']);
  }
}
