import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-diagnosis-treatmentplan',
  templateUrl: './diagnosis-treatmentplan.page.html',
  styleUrls: ['./diagnosis-treatmentplan.page.scss'],
})
export class DiagnosisTreatmentplanPage implements OnInit {

  trackRecord : any;
  loader : any;
  isReadOnly : boolean = true;

  isEmptyDiagnosis : boolean;
  isEmptyTreatmentPlan : boolean;

  addDiagnosis : boolean = false;
  addTreatmentPlan : boolean = false;
  submitAttempt : boolean;
  form : FormGroup;
  diagnosisResult : Observable<any>;
  treatmentPlanResult : Observable<any>;
  
  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,
              public formBuilder : FormBuilder,
              public toastController : ToastController,) { 
    
    this.form = formBuilder.group({
      description : ['', Validators.required],
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.trackRecord = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.form.reset();
    this.addDiagnosis = false;
    this.addTreatmentPlan = false;
    this.loader = true;
    setTimeout(() => {
      this.checkDiagnosisFeed();
      this.checkTreatmentPlanFeed();
      this.loader = false;
    }, 2000)
  }

  checkDiagnosisFeed(){
    this.apiService.getDiagnosis(this.trackRecord['id']).subscribe(val => {
      if(val == ''){
        this.isEmptyDiagnosis = true;
      }else{
        this.isEmptyDiagnosis = false;
        this.getDiagnosisFeed();
      }
    })
  }

  getDiagnosisFeed(){
    this.diagnosisResult = this.apiService.getDiagnosis(this.trackRecord['id']);
    this.diagnosisResult.subscribe((val) => {
      console.log(val);
    })
  }

  checkTreatmentPlanFeed(){
    this.apiService.getTreatmentPlan(this.trackRecord['id']).subscribe(val => {
      if(val == ''){
        this.isEmptyTreatmentPlan = true;
      }else{
        this.isEmptyTreatmentPlan = false;
        this.getTreatmentPlanFeed();
      }
    }) 
  }

  getTreatmentPlanFeed(){
    this.treatmentPlanResult = this.apiService.getTreatmentPlan(this.trackRecord['id']);
    this.treatmentPlanResult.subscribe((val) => {
      console.log(val);
    })
  }

  async attemptAdd(){
    const alert = await this.alertController.create({
      header: 'Diagnosis & Treatment Plan',
      message: 'Add new data to?',
      backdropDismiss: false,
      inputs: [
        {
          name: 'diagnosis',
          type: 'radio',
          label: 'Diagnosis',
          value: 'diagnosis',
        },
        {
          name: 'treatment_plan',
          type: 'radio',
          label: 'Treatment Plan',
          value: 'treatment_plan',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=> {
            console.log('cancel')
          }
        },
        {
          text: 'Ok',
          handler:(data : string) => {
            if(data == 'diagnosis'){
              this.addDiagnosis = true;
            }else{
              this.addTreatmentPlan = true;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  cancelAddDiagnosis(){
    this.addDiagnosis = false;
    this.form.reset();
  }

  cancelAddTreatmentPlan(){
    this.addTreatmentPlan = false;
    this.form.reset();
  }
  
  addNewDiagnosis(){
    this.submitAttempt = true;
    let diagnosisData = {
      "description" : this.form.value.description,
      "track_record" : this.trackRecord['id'],
    }
    if(!this.form.valid){
      this.requiredField()
    }else{
      this.loader = true;
      this.apiService.addDiagnosis(diagnosisData).then((val) => {
        this.addSuccessDiagnosisMessage();
      })
      .catch(error => {
        console.log(error);
        this.errorMessage();
      })
    }
  }

  addNewTreatmentPlan(){
    this.submitAttempt = true;
    let treatmentPlanData = {
      "description" : this.form.value.description,
      "track_record" : this.trackRecord['id'],
    }
    if(!this.form.valid){
      this.requiredField()
    }else{
      this.loader = true;
      this.apiService.addTreatmentPlan(treatmentPlanData).then((val) => {
        this.addSuccessTreatmentPlanMessage();
      })
      .catch(error => {
        console.log(error);
        this.errorMessage();
      })
    }
  }

  async confirmationDeleteDiagnosis(diagnosisId){
    const alert = await this.alertController.create({
      header: 'Remove Diagnosis',
      message: 'Do you want to delete this record? Please note this cannot be undone.',
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
            this.deleteDiagnosis(diagnosisId);
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmationDeleteTreatmentPlan(treatmentPlanId){
    const alert = await this.alertController.create({
      header: 'Remove Treatment Plan',
      message: 'Do you want to delete this record? Please note this cannot be undone.',
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
            this.deleteTreatmentPlan(treatmentPlanId);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteDiagnosis(diagnosisId){
    this.loader = true;
    this.apiService.deleteDiagnosis(diagnosisId).then((val) => {
      this.deleteSuccessMessage('Diagnosis has been deleted.')
    })
    .catch(error => {
      this.errorMessage();
    })
  }

  deleteTreatmentPlan(treatmentPlanId){
    this.loader = true;
    this.apiService.deleteTreatmentPlan(treatmentPlanId).then((val) => {
      this.deleteSuccessMessage('Treatment Plan has been deleted.')
    })
    .catch(error => {
      this.errorMessage();
    })
  }


  async addSuccessDiagnosisMessage() {
    const alert = await this.alertController.create({
      header: 'Successful',
      message: 'New diagnosis has been added.',
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  async addSuccessTreatmentPlanMessage() {
    const alert = await this.alertController.create({
      header: 'Successful',
      message: 'New treatment plan has been added.',
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  async deleteSuccessMessage(message : string) {
    const alert = await this.alertController.create({
      header: 'Successful',
      message: message,
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
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
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  async requiredField() {
    const toast = await this.toastController.create({
      message: 'Please fill out the field.',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}