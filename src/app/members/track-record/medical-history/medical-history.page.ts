import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.page.html',
  styleUrls: ['./medical-history.page.scss'],
})
export class MedicalHistoryPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly = true;
  physicianCare : boolean;
  hospitalization : string;
  allergies : string;
  illnesses : string;
  medications : string;
  childhoodDiseaseHistory : string;
  hasMedicalHistory : boolean;
  medicalHistoryId : string;
  dateTimeAdded : string;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,) { 

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.apiService.getMedicalHistory(this.track_record['id']).subscribe((val) => {
        if(val==null){
          this.hasMedicalHistory = false;
        }else{
          this.hasMedicalHistory = true;
          this.physicianCare = val['physician_care']
          this.hospitalization = val['hospitalization']
          this.allergies = val['allergies']
          this.illnesses = val['illnesses']
          this.medications = val['medications']
          this.childhoodDiseaseHistory = val['childhood_disease_history']
          this.dateTimeAdded = val['datetime_added']
        }
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

    if(this.hasMedicalHistory){
      let medicalHistoryData = {
        "medical_history" : {
          "physician_care" : this.physicianCare,
          "hospitalization" : this.hospitalization,
          "allergies" : this.allergies,
          "illnesses" : this.illnesses,
          "medications" : this.medications,
          "childhood_disease_history" : this.childhoodDiseaseHistory,
          "datetime_added" : new Date()
        }
      }
    
      this.debouncer = setTimeout(() => {
        this.apiService.updateMedicalHistory(medicalHistoryData, this.track_record['id']).then(res => {
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
    }else{
      let medicalHistoryData = {
        "physician_care" : this.physicianCare,
        "hospitalization" : this.hospitalization,
        "allergies" : this.allergies,
        "illnesses" : this.illnesses,
        "medications" : this.medications,
        "childhood_disease_history" : this.childhoodDiseaseHistory,
        "datetime_added" : new Date()
      }

      this.debouncer = setTimeout(() => {
        this.apiService.addMedicalHistory(medicalHistoryData).then(res => {
          this.medicalHistoryId = res['id']
          let trackRecordData = {
            "medical_history" : this.medicalHistoryId
          }
          this.apiService.updateTrackRecord(trackRecordData, this.track_record['id']).then(res => {
            this.loader = false;
            this.successMessage();
            this.ionViewWillEnter();
          })
        })
        .catch(error => {
          this.loader = false;
          this.errorMessage();
          console.log(error);
        });
      }, 2000)
    }
  }
  
  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Medical History',
      message: 'Successfully updated',
      backdropDismiss: false,
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
      backdropDismiss: false,
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
            this.submitEditedMedicalHistory();
          }
        }
      ]
    });
    await alert.present();
  }
}
