import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-instructor-selection',
  templateUrl: './instructor-selection.page.html',
  styleUrls: ['./instructor-selection.page.scss'],
})
export class InstructorSelectionPage implements OnInit {

  track_record : any;

  isFemale : boolean;
  isApproved : boolean = false;
  isPending : boolean = false;

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router,
              private toastController : ToastController) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit(){

  }

  ionViewWillEnter() {
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
}
