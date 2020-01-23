import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { StorageService } from './../../services/storage.service';
import { AlertController, ToastController } from '@ionic/angular';
import { format } from "date-fns";
 
@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.page.html',
  styleUrls: ['./my-patients.page.scss'],
})
export class MyPatientsPage implements OnInit {

  results : Observable<any>;
  searchTerm : string = '';
  clinician : string;
  debouncer : any;
  loader : boolean;
  empty : boolean;

  requestMode : boolean = false;
  chooseInstructorMode : boolean = false;
  chooseInstructorCompletionMode : boolean = false;
  consentForm : boolean = false;
  hasUnapprovedCDAR : boolean;

  instructors : any;
  emptyInstructor : boolean;

  clinicianLastName : string;
  instructorLastName : string;
  searchInstructorTerm : string;


  instructorId : any;
  clinicianId : any;
  patientId : any;
  trackRecordId : any;
  procedure : string;
  date : any;

  constructor(private apiService : ApiService,
              private storageService : StorageService,
              private alertController : AlertController,
              private toastController : ToastController) { }

  ngOnInit() {
  }

  /* Everytime the app enter this page, 
  it will always wait for 2 seconds to check the following values:
  @ Login credentials
  @ List of patients */
  ionViewWillEnter() {
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.storageService.getObject('clinician').then((result) => {
        this.clinician = result;
        this.checkMyPatient();
        this.loader = false;
      })
    }, 2000)
  }

  /* This function is used to search for specific patient from clinician's patients. */
  searchChanged(){
    this.loader = true;
    this.results = this.apiService.searchMyPatient(this.searchTerm, this.clinician['id']);
    this.loader = false;
  }

  /* Get all of his/her patients. */
  getMyPatient(){
    this.results = this.apiService.getMyPatient(this.clinician['id']);
  }

  /* Verify if he/she already have a patient. */
  checkMyPatient(){
    this.hasUnapprovedCDAR = false;
    this.apiService.getMyPatient(this.clinician['id']).subscribe(val => {
      if(val == ''){
        this.empty = true;
      }else{
        console.log(val)
        this.empty = false;
        this.getMyPatient();
      }
    });
  }

  /* These functions below are for CDAR Request form
  @ searchInstructor - search specific instructor from a list of instructors.
  @ checkInstructor - check if there is available instructor. 
  @ initiateChooseInstructor - after add instructor 'button' was clicked, setup the instructor form. 
  @ acceptChosenInstructor - after choosing instructor, save the instructor information. 
  @ cancelChooseInstructor - if the clincian cancel choosing instructor, the instructor information reset. 
  @ initiateCdar - if add cdar button has been clicked, setup the cdar form. However, this form is only restricted
  to those clinician who have no further cdar approval.
  @ cancelCdar - cancel cdar transaction and reset all the variables.
  @ sendCdar - send cdar details to API.
  */
  searchInstructor(){
    this.instructors = this.apiService.searchInstructor(this.searchInstructorTerm);
  }
  checkInstructor(){
    this.apiService.getClinicianList().subscribe(val => {
      if(val == ''){
        this.emptyInstructor = true;
      }else{
        this.emptyInstructor = false;
        this.instructors = this.apiService.getInstructorList();
      }
    });
  }
  initiateChooseInstructor(){
    this.chooseInstructorMode = true;
    this.requestMode = false;
    this.checkInstructor();
  }
  acceptChosenInstructor(data){
    this.instructorId = data['id'];
    this.instructorLastName = data['last_name'];
    this.requestMode = true;
  }
  cancelChooseInstructor(){
    this.instructorId = '';
    this.instructorLastName = '';
    this.requestMode = true;
    this.chooseInstructorMode = false;
  }
  intitiateCDAR(data){
    this.apiService.getAllCdar(data['clinician']['id']).subscribe((val) => {
      var cdar = JSON.parse(JSON.stringify(val));
      for(var i = 0; i<cdar.length; i++){
        if(!cdar[i]['instructor_signature']){
          this.hasUnapprovedCDAR = true;
          console.log(true);
        }
      }

      if(!this.hasUnapprovedCDAR){
        this.requestMode = true;
        this.patientId = data['patient']['id'];
        this.clinicianId = data['clinician']['id'];
        this.clinicianLastName = data['clinician']['last_name'];
        this.trackRecordId = data['id'];
      }else{
        this.hasUnapproved();
      }
    })
  }
  cancelCDAR(){
    this.requestMode = false;
    this.chooseInstructorMode = false;
    this.consentForm = false;
    this.procedure = '';
    this.date = '';
    this.instructorLastName = '';
    this.instructorId = '';
  }
  sendCDAR(){
    if(this.date === undefined || this.procedure === undefined || this.instructorLastName === undefined 
      || this.procedure === '' || this.date === '' || this.instructorLastName === ''){
        this.allRequired();
    }else if(this.consentForm == false){
      this.agreeConsentForm();
    }else{
      this.loader = true;
      this.debouncer = setTimeout(() => {
        let cdarData = {
          "procedure": this.procedure,
          "date": format(new Date(this.date), "yyyy-MM-dd"),
          "patient_signature": true,
          "pending_for_approval": true,
          "clinician": this.clinicianId,
          "clinical_instructor": this.instructorId,
          "track_record": this.trackRecordId,
          "patient": this.patientId,
          "treatment_record" : 0,
        }

        this.apiService.addCDAR(cdarData).then((res) => {
          let trackRecordData = {
            "clinical_instructor" : this.instructorId,
          }

          this.apiService.updateTrackRecord(trackRecordData, this.trackRecordId);
          this.addSuccessMessage();
        })
        .catch(error => {
          this.errorMessage();
          console.log(error);
        })
      }, 2000)
    }
  }
  
  /* Function for releasing a patient */
  releasePatient(patient){

    this.loader = true;
    let trackRecordData = {
      "clinician": null,
    }

    setTimeout(() => {
      this.apiService.updateTrackRecord(trackRecordData, patient['id']).then((res) => {

        let patientData = {
          "has_doctor": false,
        }

        this.apiService.updatePatient(patient['patient']['id'], patientData).then((res) => {
          console.log(res);
          this.releaseSuccessMessage();
        })
        .catch(error => {
          console.log(error);
          this.errorMessage();
        })
      })
      .catch(error => {
        console.log(error);
      })
    }, 2000)
  }

  /* Utility function for refreshing the current page. */
  doRefresh(event){
    setTimeout(() => {
      this.checkMyPatient();
      event.target.complete();
    }, 2000);
  }

  /* Pop-up selection window for patient consent  */
  async showConsentForm(){
    const alert = await this.alertController.create({
      header: 'Consent Form',
      message: 'I verify that the given information are true and accurate.'
      +' I understand this information will be used to determine the dental treatment'+
      ' I will receive in this dental infirmary and it may be shared with other medical officers only if necessary.'+
      ' I will notify this dental office should any information changed. <br><br>'+
      'I hereby authorize the clinician to perform any recommended services and to store my private data for safekeeping.',
      cssClass: 'terms-conditions',
      buttons: [
        {
          text: 'Disagree',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.consentForm = false;
          }
        }, {
          text: 'Agree',
          handler: () => {
            this.consentForm = true;
          }
        }
      ]
    });
    await alert.present();
  }

  /* Pop-up confirmation window for finalizing selecting of instructor */
  async showChooseInstructorMessage(data){

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you want to assign '+data['first_name']+' '+data['last_name']+'?',
      cssClass: 'confirmation',
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
            this.acceptChosenInstructor(data)
            this.chooseInstructorMode = false;
            this.consentForm = false;
          }
        }
      ]
    });
    await alert.present();
  }

  /* Pop-up confirmation window for finalizing selecting of instructor */
  async showReleaseConfirmation(data){
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you want to release <b>'+data['patient']['first_name']+' '+data['patient']['last_name']+'</b>? Please remind this cannot be undone.',
      cssClass: 'release-patient',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Yes',
          cssClass: 'delete',
          handler: () => {
            this.releasePatient(data);
          }
        }
      ]
    });
    await alert.present();
  }

  /* Error handling for empty fields when sending cdar. */
  async allRequired() {
    const toast = await this.toastController.create({
      message: 'All fields are required',
      duration: 2000
    });
    toast.present();
  } 

  /* Error handling for patient who did not agree with consent form */
  async agreeConsentForm(){
    const toast = await this.toastController.create({
      message: 'Patient must agree to consent form first.',
      duration: 2000
    });
    toast.present();
  }

  /* Pop-up confirmation window for finalizing the cdar. */
  async showConfirmationMessage(){

    const alert = await this.alertController.create({
      header: 'CDAR',
      message: 'Do you want to create a new request for your daily achievement record?',
      cssClass: 'confirmation',
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
            this.sendCDAR();
          }
        }
      ]
    });
    await alert.present();
  }

  /* Pop-up window message for successful transaction. */
  async addSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'New Clinician Daily Achievement Record has been sent.',
      backdropDismiss: false,
      cssClass: 'success-message',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.requestMode = false;
          this.chooseInstructorMode = false;
          this.consentForm = false;
          this.loader = false;
          this.date = '';
          this.procedure = '';
          this.instructorId = '';
          this.instructorLastName = '';
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  /* Pop-up window message for successful transaction. */
  async releaseSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Patient has been released.',
      backdropDismiss: false,
      cssClass: 'success-message',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  /* Pop-up window message for failed transaction */
  async errorMessage() {
    const alert = await this.alertController.create({
      header: 'Ooooops',
      message: 'Something went wrong. Please try again later.',
      cssClass: 'error-message',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.loader = false;
        }
      }],
    });
    await alert.present();
  }

  /* Error handling for having an existing unapproved cdar. */
  async hasUnapproved() {
    const toast = await this.toastController.create({
      message: 'Please make sure to complete first the prior daily achievement record.',
      duration: 2000
    });
    toast.present();
  }
}