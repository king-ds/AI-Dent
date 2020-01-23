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

  addTreatMentRecordMode : boolean = false;
  addClinicalInstructorMode : boolean = false;

  editTreatmentNotesMode : boolean = false;
  editTreatmentNotes : string = '';
  editProcedure : string = '';

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
  hasUnapprovedRecord : boolean = false;

  clinicianLastName : string;
  clinicianId : any;

  procedure : string;
  date : string;
  treatmentNotes : string;

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
    this.addTreatMentRecordMode = false;
    this.hasSelectedInstructor = false;
    this.editTreatmentNotesMode = false;
    this.editTreatmentNotes = '';
    this.editProcedure = '';
    this.treatmentNotes = '';
    this.date = '';
    this.procedure = '';
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
    this.treatmentRecords = [];
    this.hasUnapprovedRecord = false;

    this.apiService.getTreatmentRecord(this.track_record['id']).subscribe(val => {
      console.log(val);
      if(val == ''){
        this.isEmpty = true;
      }else{
        this.isEmpty = false;
        this.treatmentRecords = JSON.parse(JSON.stringify(val));
        console.log(this.treatmentRecords);
        for(var i=0; i<this.treatmentRecords.length; i++){
          var id = this.treatmentRecords[i]['id']
          var date = this.treatmentRecords[i]['date']
          var clinician = this.treatmentRecords[i]['clinician']['last_name']
          var procedure = this.treatmentRecords[i]['procedure']
          var approved = this.treatmentRecords[i]['patient_signature']
          var treatmentNotes = this.treatmentRecords[i]['treatment_notes']
          var approvedByInstructor = this.treatmentRecords[i]['instructor_signature']

          if(!this.treatmentRecords[i]['instructor_signature']){
            this.hasUnapprovedRecord = true;
          }

          try {
            var instructor = this.treatmentRecords[i]['clinical_instructor']['last_name'] + ", " + this.treatmentRecords[i]['clinical_instructor']['first_name']
          }
          catch(err){
            var instructor = 'No instructor yet'
            console.log(err);
          }

          this.cleanedTreatmentRecords.push({ 'id' : id,
                                              'date' : date,
                                              'instructor' : instructor,
                                              'procedure' : procedure,
                                              'clinician' : clinician,
                                              'approved' : approved,
                                              'treatment_notes' : treatmentNotes,
                                              'instructorsignature': approvedByInstructor})
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
    this.editTreatmentNotesMode = false;
    this.editTreatmentNotes = '';
    this.editProcedure = '';
    this.date = '';
    this.procedure = '';
    this.treatmentNotes = '';
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
          "patient": this.patientId,
          "treatment_record" : this.selectedTreatmentRecord['id'],
          "from_treatment_record" : true,
        }
        this.apiService.addCDAR(cdarData).then((res) => {
          this.assignInstructorMessage();
        });
        let trackRecordData = {
          'clinical_instructor' : this.instructorId
        }
        this.apiService.updateTrackRecord(trackRecordData, this.track_record['id']);
      })
      .catch(error => {
        console.log(error);
        this.errorMessage();
      });
    }, 2000)
  }

  updateTreatmentRecord_2(){
    if(this.editTreatmentNotes === undefined || this.editProcedure === undefined || this.editTreatmentNotes === '' || this.editProcedure === ''){
      this.allRequired();
    }else{
      this.loader = true;
      setTimeout(() => {
        let treatmentRecordData = {
          'treatment_notes': this.editTreatmentNotes,
          'procedure': this.editProcedure,
        }
        this.apiService.updateTreatmentRecord(treatmentRecordData, this.selectedTreatmentRecord).then((res) => {
          this.updateSuccessMessage();
        })
        .catch(error => {
          console.log(error);
          this.errorMessage();
        })
      }, 2000)
    }
  }

  addTreatmentRecord(){
    if(this.date === undefined || this.procedure === undefined || this.treatmentNotes === undefined || this.treatmentNotes === '' || this.procedure === '' || this.date === ''){
      this.allRequired()
    }else if(this.hasUnapprovedRecord){
      this.hasUnapproved();
    }else{
      let treatmentRecordData = {
        "procedure": this.procedure,
        "treatment_notes" : this.treatmentNotes,
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
      message: 'Do you want to assign this record to Doc. '+details['first_name']+' '+details['last_name']+'?',
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
          this.treatmentNotes = '';
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  async assignInstructorMessage() {
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

  async updateSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Treatment record has been updated.',
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
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
    setTimeout(() => {
      this.checkTreatmentRecordFeed();
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

  async alreadyApproved() {
    const toast = await this.toastController.create({
      message: 'Approved record is not editable.',
      duration: 2000
    });
    toast.present();
  }

  async hasUnapproved() {
    const toast = await this.toastController.create({
      message: 'Please make sure to complete first the prior record.',
      duration: 2000
    });
    toast.present();
  }

  async optionMessage(item){
    console.log(item);
    const alert = await this.alertController.create({
      header: 'Treatment Record',
      message: 'Do you want to?',
      backdropDismiss: false,
      inputs: [
        {
          name: 'show_treatment_notes',
          type: 'radio',
          label: 'Show treatment notes',
          value: 'show_treatment_notes',
        },
        {
          name: 'edit_treatment_notes',
          type: 'radio',
          label: 'Edit treatment notes',
          value: 'edit_treatment_notes',
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
            if(data == 'show_treatment_notes'){
              this.showTreatmentNotes(item['treatment_notes']);
            }else if(data == 'edit_treatment_notes'){
              if(item['approved']){
                this.alreadyApproved();
              }else{
                this.editTreatmentNotesMode = true;
                this.editTreatmentNotes = item['treatment_notes'];
                this.editProcedure = item['procedure'];
                this.selectedTreatmentRecord = item['id']
              }
            }else{
              console.log('Not selected');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showTreatmentNotes(treatmentNotes){
    const alert = await this.alertController.create({
      header: 'Treatment Notes',
      message: treatmentNotes,
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
}