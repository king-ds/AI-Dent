import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {

  clinician : string;
  information = null;
  loader : boolean = false;
  debouncer : any;
  add_patient : boolean;
  add_complaint : boolean;
  add_track_record : boolean;
  track_record_id : string;

  constructor(private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private storageService : StorageService,
              private router : Router,
              private alertController : AlertController) { }

  ngOnInit() {
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.getCurrentClinician();
      this.getPatientDetails();
      this.loader = false;
    }, 2000)
  }

  addPatient(){
    this.loader = true;
    let patient_id = this.information['id'];

    // Add track record
    this.debouncer = setTimeout(() => {
    let trackRecord = {
      "patient" : patient_id,
      "clinician" : this.clinician,
    }
      this.addTrackRecord(trackRecord);
    }, 2000)

    // Update patient status
    this.debouncer = setTimeout(() =>{
      let assignedData = {
        'assigned_to' : this.clinician,
        'has_doctor' : true,
      }

      this.updatePatient(patient_id, assignedData);
      this.loader = false;
    }, 4000);
  }

  addTrackRecord(data){
    this.apiService.addTrackRecord(data).then(res => {
      this.track_record_id = res['id']
      this.add_track_record = true;
    })
    .catch(error => {
      console.log(error);
      this.add_track_record = false;
    });
  }

  updatePatient(patient_id, assignedData){
    this.apiService.addPatient(patient_id, assignedData).then(res => {
      console.log(res);
      this.add_patient = true;
      this.successMessage();
    })
    .catch(error => {
      console.log(error);
      this.add_patient = false;
      this.errorMessage();
    });
  }

  getPatientDetails(){
    let patient_id = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getPatientDetails(patient_id).subscribe(result => {
      this.information = result;
    });
  }

  getCurrentClinician(){
    this.storageService.getObject('clinician').then((result) => {
      this.clinician = result['id'];
    });
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: this.information['first_name']+' '+this.information['last_name']+' added to your patient',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.router.navigate(['members', 'menu', 'clinician-dashboard']);
        }
      }],
    });
    await alert.present();
  }

  async errorMessage() {
    const alert = await this.alertController.create({
      header: 'Ooooops',
      message: 'Something went wrong. Please try again later.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.router.navigate(['members', 'menu', 'clinician-dashboard']);
        }
      }],
    });
    await alert.present();
  }

  async confirmationMessage(){

    const alert = await this.alertController.create({
      header: 'Add Patient',
      message: 'Do you want to add this patient?',
      cssClass: 'add-patient',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.addPatient();
          }
        }
      ]
    });
    await alert.present();
  }
}