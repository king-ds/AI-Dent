import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit {

  clinician : string;
  information = null;

  constructor(private apiService : ApiService,
              private activatedRoute : ActivatedRoute,) { }

  ngOnInit() {
    this.getPatientDetails();
  }

  getPatientDetails(){
    let patient_id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(patient_id);

    this.apiService.getPatientDetails(patient_id).subscribe(result => {
      this.information = result;
    });
  }
}