import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.page.html',
  styleUrls: ['./medical-history.page.scss'],
})
export class MedicalHistoryPage implements OnInit {

  patient : any;
  debouncer : any;
  loader : any;
  isReadOnly = true;
  physicianCare : boolean;
  hospitalization : string;
  allergies : string;
  illnesses : string;
  medications : string;
  childhoodDiseaseHistory : string;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,) { 

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.patient = this.router.getCurrentNavigation().extras.state.patient;
      }
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.apiService.getMedicalHistory(this.patient['track_record']).subscribe((val) => {
        this.physicianCare = val['physician_care']
        this.hospitalization = val['hospitalization']
        this.allergies = val['allergies']
        this.illnesses = val['illnesses']
        this.medications = val['medications']
        this.childhoodDiseaseHistory = val['childhood_disease_history']
        this.loader = false;
      })
    }, 2000)
  }

  editMedicalHistory(){
    this.isReadOnly = false;
  }

  cancelEdit(){
    this.isReadOnly = true;
  }

  submitEditedMedicalHistory(){
    this.loader = true;
    this.isReadOnly = true;

    let medicalHistoryData = {
      "medical_history" : {
        "physician_care" : this.physicianCare,
        "hospitalization" : this.hospitalization,
        "allergies" : this.allergies,
        "illnesses" : this.illnesses,
        "medications" : this.medications,
        "childhood_disease_history" : this.childhoodDiseaseHistory,
        "datetime_added" : new Date(),
      }
    }
  
  this.debouncer = setTimeout(() => {
    this.apiService.updateMedicalHistory(medicalHistoryData, this.patient['track_record']).then(res => {
      this.loader = false;
      this.successMessage();
      this.ionViewWillEnter();
    })
    .catch(error => {
      this.loader = false;
      this.errorMessage();
      console.log(error);
    });
  }, 2000)
  }
  
  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Medical History',
      message: 'Successfully updated',
      buttons: [{
        text:'Ok',
        handler: () => {
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

  async confirmationMessage(){

    const alert = await this.alertController.create({
      header: 'Medical History',
      message: 'Do you want to send this update?',
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
            this.submitEditedMedicalHistory();
          }
        }
      ]
    });
    await alert.present();
  }
}
