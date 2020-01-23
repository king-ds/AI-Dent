import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { error } from 'util';

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
  trackRecordId : string;
  hasTrackRecord : boolean;

  constructor(private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private storageService : StorageService,
              private router : Router,
              private alertController : AlertController,
              private navController : NavController) { }

  ngOnInit() {
  }

  /* At the very beginning of this page. Get the following details: 
  @ Clinician
  @ Patient */
  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.getCurrentClinician();
      this.getPatientDetails();
      this.loader = false;
    }, 2000)
  }

  /* Function for assigning patient to clinician. 
  Adding new track record if not existing and updating if existing. */
  addPatient(){
    this.loader = true;
    let patientId = this.information['id'];

    this.getPatientTrackRecord(patientId);

    setTimeout(() => {
      if(this.hasTrackRecord){
        console.log('has track record')
        let trackRecordData = {
          "clinician": this.clinician
        }

        this.updateTrackRecord(this.trackRecordId, trackRecordData);

        let patientData = {
          "assigned_to": this.clinician,
          "has_doctor": true,
        }
  
        this.updatePatient(patientId, patientData);
  
      }else{
        console.log('no track record')
        let trackRecordData = {
            "patient": patientId,
            "clinician": this.clinician,
          }
  
        this.addTrackRecord(trackRecordData);
  
        let patientData = {
          "has_doctor": true,
        }
  
        this.updatePatient(patientId, patientData);
      }
    }, 2000)
  }

  updateTrackRecord(trackRecordId, trackRecordData){
    this.apiService.updateTrackRecord(trackRecordData, trackRecordId).then((res) => {
    console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  addTrackRecord(data){
    this.apiService.addTrackRecord(data).then(res => {
      this.trackRecordId = res['id']
    })
    .catch(error => {
      console.log(error);
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

  getPatientTrackRecord(patientId){
    this.apiService.getMyTrackRecord(patientId).subscribe((val) => {
      this.hasTrackRecord = true;
      this.trackRecordId = val['id'];
    }, 
    (error) => {
      this.hasTrackRecord = false;
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
      backdropDismiss: false,
      cssClass: 'success-message',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.navController.navigateRoot(['members', 'menu', 'clinician-dashboard']);
        }
      }],
    });
    await alert.present();
  }

  async errorMessage() {
    const alert = await this.alertController.create({
      header: 'Ooooops',
      message: 'Something went wrong. Please try again later.',
      backdropDismiss: false,
      cssClass: 'error-message',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.navController.navigateRoot(['members', 'menu', 'clinician-dashboard']);
        }
      }],
    });
    await alert.present();
  }

  async confirmationMessage(){

    const alert = await this.alertController.create({
      header: 'Add Patient',
      message: 'Do you want to add this patient?',
      cssClass: 'confirmation',
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