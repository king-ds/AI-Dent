import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';
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

  submitAttempt : boolean;
  addTreatMentRecordMode : boolean;
  addClinicalInstructorMode : boolean;

  treatmentRecords : any;
  cleanedTreatmentRecords : any[] = [];

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
              private alertController : AlertController,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.checkTreatmentRecordFeed();
    this.clinicianLastName = this.track_record['clinician']['last_name']
    this.clinicianId = this.track_record['clinician']['id']
    this.patientId = this.track_record['patient']['id']
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
          this.cleanedTreatmentRecords.push({ 'date' : this.treatmentRecords[i]['date'],
                                              'instructor' : this.treatmentRecords[i]['clinical_instructor']['last_name'] + ", " + this.treatmentRecords[i]['clinical_instructor']['first_name'],
                                              'procedure' : this.treatmentRecords[i]['procedure'],
                                              'clinician' : this.treatmentRecords[i]['clinician']['last_name'],
                                              'approved' : this.treatmentRecords[i]['patient_signature'],})
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
    this.instructorId = '';
    this.instructorLastName = '';
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

  cancelAddClinicalInstructor(){
    this.addClinicalInstructorMode = false;
    this.addTreatMentRecordMode = true;
  }

  searchInstructor(){
    this.loader = true;
    this.instructors = this.apiService.searchInstructor(this.searchTerm);
    this.loader = false;
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

  addTreatmentRecord(){
    if(this.date === undefined || this.procedure === undefined || this.instructorId === undefined
      || this.procedure === '' || this.date === '' || this.instructorId === ''){
      console.log('All fields are required');
    }else{
      let treatmentRecordData = {
        "procedure": this.procedure,
        "date": format(new Date(this.date), "yyyy-MM-dd"),
        "patient_signature": false,
        "clinician": this.clinicianId,
        "clinical_instructor": this.instructorId,
        "track_record": this.track_record['id'],
        "patient": this.patientId
      }
      this.apiService.addTreatmentRecord(treatmentRecordData).then(res => {
        this.successMessage();
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
      message: 'Do you want to assign this record to '+details['first_name']+' '+details['last_name']+' ?',
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
            this.instructorId = details['id'];
            this.instructorLastName = details['last_name'];
            this.hasSelectedInstructor = true;
            this.addClinicalInstructorMode = false;
            this.addTreatMentRecordMode = true;
          }
        }
      ]
    });
    await alert.present();
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Awesome',
      message: 'New treatment record has been added.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.addTreatMentRecordMode = false;
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

  doRefresh(event){
    this.ionViewWillEnter();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}