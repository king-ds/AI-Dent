import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { StorageService } from './../../services/storage.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-transfer-patient',
  templateUrl: './transfer-patient.page.html',
  styleUrls: ['./transfer-patient.page.scss'],
})
export class TransferPatientPage implements OnInit {
  
  patients : Observable<any>;
  clinicians : Observable<any>;
  clinician : string;
  debouncer : any;
  loader : boolean;
  emptyPatient : boolean;
  emptyClinician : boolean;
  searchTerm : string = '';

  transferMode : boolean = false;
  selectedPatient : any;

  constructor(private apiService : ApiService,
              private storageService : StorageService,
              private alertController : AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.storageService.getObject('clinician').then((result) => {
        this.clinician = result;
        console.log(this.clinician);

      })
    }, 2000)

    this.debouncer = setTimeout(() => {
      this.checkMyPatient();
      this.loader = false;
    }, 3000)
  }

  searchPatient(){
    this.loader = true;
    this.patients = this.apiService.searchMyPatient(this.searchTerm, this.clinician['id']);
    this.loader = false;
  }

  getMyPatient(){
    this.patients = this.apiService.getMyPatient(this.clinician['id']);
  }

  checkMyPatient(){
    this.apiService.getMyPatient(this.clinician['id']).subscribe(val => {
      if(val == ''){
        this.emptyPatient = true;
      }else{
        console.log(val)
        this.emptyPatient = false;
        this.getMyPatient();
      }
    });
  }

  checkClinicians(){
    this.apiService.getClinicianList().subscribe(val => {
      if(val == ''){
        this.emptyClinician = true;
      }else{
        this.emptyClinician = false;
        this.clinicians = this.apiService.getClinicianList();
      }
    });
  }

  searchClinician(){
    this.loader = true;
    this.clinicians = this.apiService.searchClinician(this.searchTerm);
    this.loader = false;
  }

  transferPatient(details){
    this.loader = true;
    this.searchTerm = '';

    this.debouncer = setTimeout(() => {
      this.transferMode = true;
      this.selectedPatient = details;
      this.checkClinicians();
      this.loader = false;
    }, 2000)
  }

  cancelTransfer(){
    this.transferMode = false;
    this.selectedPatient = '';
  }

  updatePatient(clinician){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      let trackRecordData = {
        "clinician" : clinician['id']
      }
      this.apiService.updateTrackRecord(trackRecordData, this.selectedPatient['id']).then(res => {
        this.successMessage();
      })
      .catch(error => {
        this.errorMessage();
        console.log(error);
      })
    }, 2000)
  }

  async confirmationMessage(details){

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you want to transfer this patient to '+details['first_name']+' '+details['last_name']+' ?',
      cssClass: 'add-patient',
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
            this.updatePatient(details);
          }
        }
      ]
    });
    await alert.present();
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Awesome',
      message: 'Patient has been successfully transfer.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.transferMode = false;
          this.ionViewWillEnter();
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
        }
      }],
    });
    await alert.present();
  }
}