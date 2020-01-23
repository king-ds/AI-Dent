import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { format } from "date-fns";

@Component({
  selector: 'app-treatment-record',
  templateUrl: './treatment-record.page.html',
  styleUrls: ['./treatment-record.page.scss'],
})
export class TreatmentRecordPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly = true;
  isEmpty : boolean;

  addTreatMentRecordMode : boolean;
  addClinicalInstructorMode : boolean;

  treatmentRecords : any;
  cleanedTreatmentRecords : any[] = [];
  selectedTreatmentRecord : any;

  tableStyle = 'bootstrap';

  searchTerm : string = '';
  instructors : Observable<any>;
  selectedInstructor : any;
  emptyInstructor : boolean;

  instructorLastName : string;
  instructorId : any;
  hasSelectedInstructor : boolean = false;

  clinicianLastName : string;
  clinicianId : any;

  procedure : string;
  date : string;

  patientId : any;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,
              private toastController : ToastController) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    setTimeout(() => {
      this.checkTreatmentRecordFeed();
      this.clinicianLastName = this.track_record['clinician']['last_name']
      this.clinicianId = this.track_record['clinician']['id']
      this.patientId = this.track_record['patient']['id']
      this.loader = false;
    }, 2000)
  }

  checkTreatmentRecordFeed(){
    this.cleanedTreatmentRecords = [];
    this.apiService.getTreatmentRecord(this.track_record['id']).subscribe(val => {
      if(val == ''){
        this.isEmpty = true;
      }else{
        this.isEmpty = false;
        this.treatmentRecords = JSON.parse(JSON.stringify(val));
        for(var i=0; i<this.treatmentRecords.length; i++){
          var id = this.treatmentRecords[i]['id']
          var date = this.treatmentRecords[i]['date']
          var clinician = this.treatmentRecords[i]['clinician']['last_name']
          var procedure = this.treatmentRecords[i]['procedure']
          var approved = this.treatmentRecords[i]['patient_signature']

          try {
            var instructor = this.treatmentRecords[i]['clinical_instructor']['last_name'] + ", " + this.treatmentRecords[i]['clinical_instructor']['first_name']
          }
          catch(err){
            var instructor = 'No instructor yet'
            console.log(err);
          }
          console.log(instructor);
          this.cleanedTreatmentRecords.push({ 'id' : id,
                                              'date' : date,
                                              'instructor' : instructor,
                                              'procedure' : procedure,
                                              'clinician' : clinician,
                                              'approved' : approved,})
        }
        this.treatmentRecords = this.cleanedTreatmentRecords;
      }
    });
  }

  attemptAddTreatmentRecord(){
    this.addTreatMentRecordMode = true;
  }

  cancelTreatmentRecord(){
    this.addTreatMentRecordMode = false;
    this.hasSelectedInstructor = false;
    this.date = '';
    this.procedure = '';
  }

  attemptAddClinicalInstructor(){
    this.addClinicalInstructorMode = true;
    this.addTreatMentRecordMode = false;
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.checkInstructor();
      this.loader = false;
    }, 2000)
  }

  cancelAddInstructor(){
    this.addClinicalInstructorMode = false;
  }

  searchInstructor(){
    this.instructors = this.apiService.searchInstructor(this.searchTerm);
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

  initiateAddInstructor(data){
    this.addClinicalInstructorMode = true;
    this.addTreatMentRecordMode = false;
    this.selectedTreatmentRecord = data;
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.checkInstructor();
      this.loader = false;
    }, 2000)
  }

  updateTreatmentRecord(){
    this.loader = true;
    this.hasSelectedInstructor = true;
    this.addClinicalInstructorMode = false;
    this.debouncer = setTimeout(() => {
      let treatmentRecordData = {
        "id" : this.selectedTreatmentRecord['id'],
        "clinical_instructor" : this.instructorId,
      }

      this.apiService.updateTreatmentRecord(treatmentRecordData, this.selectedTreatmentRecord['id']).then((res) => {
        let cdarData = {
          "procedure": this.selectedTreatmentRecord['procedure'],
          "date": this.selectedTreatmentRecord['date'],
          "clinical_instructor": this.instructorId,
          "clinician": this.clinicianId,
          "track_record": this.track_record['id'],
          "patient": this.patientId
        }
        console.log(cdarData);
        this.apiService.addCDAR(cdarData).then((res) => {
          this.updateSuccessMessage();
        });        
      })
      .catch(error => {
        console.log(error);
        this.errorMessage();
      });
    }, 2000)
  }

  addTreatmentRecord(){
    if(this.date === undefined || this.procedure === undefined || this.procedure === '' || this.date === ''){
      this.allRequired()
    }else{
      let treatmentRecordData = {
        "procedure": this.procedure,
        "date": format(new Date(this.date), "yyyy-MM-dd"),
        "patient_signature": false,
        "clinician": this.clinicianId,
        "track_record": this.track_record['id'],
        "patient": this.patientId
      }
      this.apiService.addTreatmentRecord(treatmentRecordData).then(res => {
        this.addSuccessMessage();
      })
      .catch(error => {
        this.errorMessage();
        console.log(error);
      })
    }
  }

  async confirmationMessage(details){

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you want to assign '+details['first_name']+' '+details['last_name']+'?',
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
            this.instructorId = details['id'];
            this.instructorLastName = details['last_name'];
            this.updateTreatmentRecord();
          }
        }
      ]
    });
    await alert.present();
  }

  async addSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'New treatment record has been added.',
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
          this.addTreatMentRecordMode = false;
          this.loader = false;
          this.date = '';
          this.procedure = '';
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  async updateSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'New instructor has been assigned',
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
          this.addTreatMentRecordMode = false;
          this.loader = false;
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
          this.loader = false;
        }
      }],
    });
    await alert.present();
  }

  doRefresh(event){
    this.ionViewWillEnter();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async allRequired() {
    const toast = await this.toastController.create({
      message: 'All fields are required',
      duration: 2000
    });
    toast.present();
  }
}