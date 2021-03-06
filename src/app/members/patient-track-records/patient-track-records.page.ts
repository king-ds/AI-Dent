import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { StorageService } from './../../services/storage.service';
import { ActivatedRoute, Router, NavigationExtras, Route } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-patient-track-records',
  templateUrl: './patient-track-records.page.html',
  styleUrls: ['./patient-track-records.page.scss'],
})
export class PatientTrackRecordsPage implements OnInit {

  debouncer : any;
  loader : boolean;

  track_record : any;
  empty : boolean;
  patient : string;

  isFemale : boolean;
  isApproved : boolean = false;
  isPending : boolean = false;

  constructor(private apiService : ApiService,
              private storageService : StorageService,
              private router : Router,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
    this.storageService.getObject('patient').then((result) => {
      this.patient = result;
      this.checkMyTrackRecord();
      this.loader = false;
      })
    }, 2000);
  }

  checkMyTrackRecord(){
    this.apiService.getMyTrackRecord(this.patient['id']).subscribe(val => {
      console.log(val);
      if(val == ''){
        this.empty = true;
      }else{
        this.empty = false;
        this.track_record = val;
        if(this.track_record['patient']['gender'] == 'Female'){
          this.isFemale = true;
        }

        if(this.track_record['is_approved_instructor']){
          this.isApproved = true;
        }
  
        if(this.track_record['pending_for_approval']){
          this.isPending = true;
        }
      }
    });
  }

  goToPatientInformation(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-personal-information'], navigationExtras);
  }

  goToComplaint(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-complaint'], navigationExtras);
  }

  goToVitalSign(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-vital-sign'], navigationExtras);
  }

  goToMedicalHistory(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-medical-history'], navigationExtras);
  }
  
  goToMedicalHealthQuestionnaire(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-medical-health-questionnaire'], navigationExtras);
  }

  goToAllergies(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-allergies'], navigationExtras);
  }

  goToDentalChart(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-dental-chart'], navigationExtras);
  }

  goToOralAssessment(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-oral-assessment'], navigationExtras);
  }

  goToSocialHistory(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-social-history'], navigationExtras); 
  }

  goToDentalHistory(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-dental-history'], navigationExtras); 
  }

  goToOcclusion(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-occlusion'], navigationExtras); 
  }

  goToGingiva(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-gingiva'], navigationExtras); 
  }

  goToFemale(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-female'], navigationExtras); 
  }

  goToTreatmentRecord(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    if(this.isApproved){
      this.router.navigate(['members', 'patient-treatment-record'], navigationExtras); 
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
    this.router.navigate(['members', 'patient-diagnosis-treatmentplan'], navigationExtras);
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

  /* Utility function for refreshing the current page. */
  doRefresh(event){
    setTimeout(() => {
      this.checkMyTrackRecord();
      event.target.complete();
    }, 2000);
  }
}