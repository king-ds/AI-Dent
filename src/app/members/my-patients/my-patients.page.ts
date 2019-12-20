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
  consentForm : boolean = false;

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

  ionViewWillEnter() {
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

  searchChanged(){
    this.loader = true;
    this.results = this.apiService.searchMyPatient(this.searchTerm, this.clinician['id']);
    this.loader = false;
  }

  getMyPatient(){
    this.results = this.apiService.getMyPatient(this.clinician['id']);
  }

  checkMyPatient(){
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


  // Request CDAR FORM

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
    this.requestMode = true;
    this.patientId = data['patient']['id'];
    this.clinicianId = data['clinician']['id'];
    this.clinicianLastName = data['clinician']['last_name'];
    this.trackRecordId = data['id'];
  }
  cancelCDAR(){
    this.requestMode = false;
    this.chooseInstructorMode = false;
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
          "clinician": this.clinicianId,
          "clinical_instructor": this.instructorId,
          "track_record": this.trackRecordId,
          "patient": this.patientId
        }

        this.apiService.addCDAR(cdarData).then((res) => {
          this.addSuccessMessage();
        })
        .catch(error => {
          this.errorMessage();
          console.log(error);
        })
      }, 2000)
    }
  }

  async showConsentForm(){

    const alert = await this.alertController.create({
      header: 'Consent Form',
      message: 'I verify that the given information are true and accurate.'
      +' I understand this information will be used to determine the dental treatment'+
      'I will receive in this dental infirmary and it may be shared with other medical officers only if necessary.'+
      ' I will notify this dental office should any information changed. <br><br>'+
      'I hereby authorize the clinician to perform any recommended services and to store my private data for safekeeping.',
      cssClass: 'add-patient',
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
  async showChooseInstructorMessage(data){

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you want to assign '+data['first_name']+' '+data['last_name']+'?',
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
            this.acceptChosenInstructor(data)
          }
        }
      ]
    });
    await alert.present();
  }
  async allRequired() {
    const toast = await this.toastController.create({
      message: 'All fields are required',
      duration: 2000
    });
    toast.present();
  }
  async agreeConsentForm(){
    const toast = await this.toastController.create({
      message: 'Patient must agree to consent form first.',
      duration: 2000
    });
    toast.present();
  }
  async showConfirmationMessage(){

    const alert = await this.alertController.create({
      header: 'CDAR',
      message: 'Do you want create a new request for your CDAR?',
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
            this.sendCDAR();
          }
        }
      ]
    });
    await alert.present();
  }
  async addSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'New Clinician Daily Achievement Record has been sent.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.requestMode = false;
          this.chooseInstructorMode = false;
          this.loader = false;
          this.date = '';
          this.procedure = '';
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
          this.loader = false;
        }
      }],
    });
    await alert.present();
  }
}