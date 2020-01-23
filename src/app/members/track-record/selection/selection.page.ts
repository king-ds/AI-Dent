import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit {

  loader : boolean;
  clinician : string;
  track_record = null;
  track_record_id : string;

  isFemale : boolean = false;
  isApproved : boolean = false;
  isPending : boolean = false;

  chooseInstructorCompletionMode : boolean = false;
  consentForm : boolean = false;

  clinicianLastName : string;
  instructorLastName : string;
  searchInstructorTerm : string;

  instructors : any;
  emptyInstructor : boolean;

  constructor(private apiService : ApiService,
              private activatedRoute : ActivatedRoute,
              private router : Router,
              private alertController : AlertController,
              private toastController: ToastController,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getPatientDetails();
  }

  getPatientDetails(){
    this.track_record_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getTrackRecord(this.track_record_id).subscribe(result => {
      this.track_record = result;
      console.log(this.track_record);
      if(this.track_record['patient']['gender'] == 'Female'){
        this.isFemale = true;
      }

      if(this.track_record['is_approved_instructor']){
        this.isApproved = true;
      }

      if(this.track_record['pending_for_approval']){
        this.isPending = true;
      }

    });
  }

  goToPatientInformation(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'personal-information'], navigationExtras)
  }

  goToComplaint(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'complaint'], navigationExtras);
  }

  goToMedicalHistory(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    
    this.router.navigate(['members', 'medical-history'], navigationExtras);
  }

  goToMedicalHealthQuestionnaire(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'medical-health-questionnaire'], navigationExtras);
  }

  goToAllergies(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'allergies'], navigationExtras);
  }

  goToVitalSign(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'vital-sign'], navigationExtras);
  }

  goToFemale(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'female'], navigationExtras);
  }

  goToOralAssessment(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'oral-assessment'], navigationExtras);
  }

  goToSocialHistory(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'social-history'], navigationExtras)
  }

  goToDentalHistory(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'dental-history'], navigationExtras)
  }

  goToOcclusion(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'occlusion'], navigationExtras)
  }

  goToGingiva(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'gingiva'], navigationExtras)
  }

  goToTreatmentRecord(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    if(this.isApproved){
      this.router.navigate(['members', 'treatment-record'], navigationExtras);
    }else{
      this.notApproved();
    }
  }

  goToDiagnosisTreatmentPlan(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    
    this.router.navigate(['members', 'diagnosis-treatmentplan'], navigationExtras)
  }

  goToDentalChart(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.apiService.getDentalChart(this.track_record['id']).subscribe((val) => {
      if(val == ''){
        this.presentAlertRadio();
      }else{
        if(val[0]['kind'] == 'Pediatric'){
          this.router.navigate(['members', 'child-dental-chart'], navigationExtras);
        }else if( val[0]['kind'] == 'Adult' ){
          this.router.navigate(['members', 'adult-dental-chart'], navigationExtras);
        }else{
          this.router.navigate(['members', 'mixed-dental-chart'], navigationExtras);
        }
      }
    })
  }

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

  cancelChooseInstructorCompletion(){
    this.chooseInstructorCompletionMode = false;
  }

  async showConsentCompletionForm(){
    const alert = await this.alertController.create({
      header: 'Consent Form',
      message: 'I verify that the given information are true and accurate.'
      +' I understand this information will be used to determine the dental treatment'+
      ' I will receive in this dental infirmary and it may be shared with other medical officers only if necessary.'+
      ' I will notify this dental office should any information changed. <br><br>'+
      'I hereby authorize the clinician to perform any recommended services and to store my private data for safekeeping.',
      cssClass: 'add-patient',
      buttons: [
        {
          text: 'Disagree',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.chooseInstructorCompletionMode = false;
          }
        }, {
          text: 'Agree',
          handler: () => {
            this.chooseInstructorCompletionMode = true;
            this.checkInstructor();
          }
        }
      ]
    });
    await alert.present();
  }

  async showChooseInstructorCompletionMessage(item){

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you want to send request for the approval of track record to Doc '+item['first_name']+' '+item['last_name']+'?',
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
            this.submitCompletion(item)
          }
        }
      ]
    });
    await alert.present();
  }

  submitCompletion(item){
    console.log(item['id']);
    this.loader = true;
    setTimeout(() => {
      let trackRecordData = {
        'is_approved_patient' : true,
        'pending_for_approval' : true,
        'clinical_instructor' : item['id']
      }

      this.apiService.updateTrackRecord(trackRecordData, this.track_record_id).then((res) => {
        this.addTreatmentRecord(item);
        this.successMessage();
      })
      .catch(error => {
        this.errorMessage();
        console.log(error);
      })
      this.loader = false;
    }, 2000)
  }

  addTreatmentRecord(item){

    let treatmentRecordData = {
      "procedure": "Approval of track record.",
      "date": format(new Date(), "yyyy-MM-dd"),
      "patient_signature": true,
      "instructor_signature": true,
      "clinician": this.track_record['clinician']['id'],
      "track_record": this.track_record['id'],
      "patient": this.track_record['patient']['id'],
      "clinical_instructor": item['id'],
    }

    this.apiService.addTreatmentRecord(treatmentRecordData).then(res => {
      console.log(res);
    });
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Track Record',
      message: 'Request for completion of track record has been sent.',
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
          this.chooseInstructorCompletionMode = false;
          this.loader = false;
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Dental Chart',
      message: 'Choose your dental chart',
      cssClass: 'alert-radio',
      inputs: [
        {
          name: 'pediatric',
          type: 'radio',
          label: 'Pediatric',
          value: 'pediatric'
        },
        {
          name: 'adult',
          type: 'radio',
          label: 'Adult',
          value: 'adult'
        },
        {
          name: 'mixed',
          type: 'radio',
          label: 'Mixed',
          value: 'mixed'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data:string) => {
            let navigationExtras : NavigationExtras = {
              state : {
                track_record : this.track_record
              }
            };

            if(data == 'pediatric'){
              let dentalChartData = {
                "track_record" : this.track_record['id'],
                "teeth_number" : 55,
                "quadrant" : 1,
                "kind" : "Pediatric",
              }

              this.apiService.addDentalChart(dentalChartData).then((res) => {
                this.router.navigate(['members', 'child-dental-chart'], navigationExtras);
              })
              .catch(error => {
                this.errorMessage();
                console.log(error);
              });
            }else if(data == 'mixed'){
              let dentalChartData = {
                "track_record" : this.track_record['id'],
                "teeth_number" : 18,
                "quadrant" : 1,
                "kind" : "Mixed",
              }

              this.apiService.addDentalChart(dentalChartData).then((res) => {
                this.router.navigate(['members', 'mixed-dental-chart'], navigationExtras);
              })
              .catch(error => {
                this.errorMessage();
                console.log(error);
              })
            }else{
              let dentalChartData = {
                "track_record" : this.track_record['id'],
                "teeth_number" : 18,
                "quadrant" : 1,
                "kind" : "Adult",
              }

              this.apiService.addDentalChart(dentalChartData).then((res) => {
                this.router.navigate(['members', 'adult-dental-chart'], navigationExtras);
              })
              .catch(error => {
                this.errorMessage();
                console.log(error);
              })
            }
          }
        }
      ]
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

  async notFemale() {
    const toast = await this.toastController.create({
      message: 'This selection is only applicable for female patient.',
      duration: 2000
    });
    toast.present();
  }

  async notApproved() {
    const toast = await this.toastController.create({
      message: 'This selection is only available upon completion of track record.',
      duration: 2000
    });
    toast.present();
  }
}