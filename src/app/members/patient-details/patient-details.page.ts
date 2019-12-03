import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {

  clinician : string;
  information = null;

  constructor(private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private storageService : StorageService,) { }

  ngOnInit() {
    this.getCurrentClinician();
    this.getPatientDetails();
  }

  addPatient(){
    let assignedData = {
      'assigned_to' : this.clinician,
      'has_doctor' : true,
    }
    let patient_id = this.information['id'];
    console.log(patient_id)

    this.apiService.addPatient(patient_id, assignedData).then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  }

  getPatientDetails(){
    let patient_id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(patient_id);

    this.apiService.getPatientDetails(patient_id).subscribe(result => {
      this.information = result;
    });
  }

  getCurrentClinician(){
    this.storageService.getObject('clinician').then((result) => {
      this.clinician = result['id'];
    });
  }
}