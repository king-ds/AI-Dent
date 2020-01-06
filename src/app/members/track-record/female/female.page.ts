import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-female',
  templateUrl: './female.page.html',
  styleUrls: ['./female.page.scss'],
})
export class FemalePage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly : boolean;
  hasFemale : boolean;
  femaleId : string;

  pregnant : string;
  breastFeeding : string;
  menopause : string;
  underHormone : string;
  isPregnant : boolean;
  isBreastFeeding : boolean;
  isMenopause : boolean;
  isUnderHormone : boolean;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
        console.log(this.track_record);
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.isReadOnly = true;
    this.debouncer = setTimeout(() => {
      this.apiService.getFemale(this.track_record['id']).subscribe((val) => {
        if(val==null){
          this.hasFemale = false;
        }else{
          this.hasFemale = true;
          this.pregnant = val['pregnant']
          this.breastFeeding = val['breast_feeding']
          this.menopause = val['menopause']
          this.underHormone = val['under_hormone']
          this.isPregnant = val['is_pregnant']
          this.isBreastFeeding = val['is_breast_feeding']
          this.isMenopause = val['is_menopause']
          this.isUnderHormone = val['is_under_hormone']
        }
        this.loader = false;
      })
    }, 2000)
  }

  editFemale(){
    this.isReadOnly = false;
  }

  cancelEdit(){
    this.isReadOnly = true;
  }

  submitEditedFemale(){
    this.loader = true;
    this.isReadOnly = true;

    if(this.hasFemale){
      let femaleData = {
        "female" : {
          "pregnant": this.pregnant,
          "breast_feeding": this.breastFeeding,
          "menopause": this.menopause,
          "under_hormone": this.underHormone,
          "is_pregnant": this.isPregnant,
          "is_breast_feeding": this.isBreastFeeding,
          "is_menopause": this.isMenopause,
          "is_under_hormone": this.isUnderHormone
        }
      }

      this.debouncer = setTimeout(() => {
        this.apiService.updateFemale(femaleData, this.track_record['id']).then(res => {
          this.loader = false;
          this.successMessage();
          this.ionViewWillEnter();
        })
        .catch(error => {
          this.loader = false;
          this.errorMessage();
          console.log(error);
        })
      }, 2000)
    }else{
      let femaleData = {

        "pregnant": this.pregnant,
        "breast_feeding": this.breastFeeding,
        "menopause": this.menopause,
        "under_hormone": this.underHormone,
        "is_pregnant": this.isPregnant,
        "is_breast_feeding": this.isBreastFeeding,
        "is_menopause": this.isMenopause,
        "is_under_hormone": this.isUnderHormone
      }

      this.debouncer = setTimeout(() => {
        this.apiService.addFemale(femaleData).then(res => {
          this.femaleId = res['id']
          let trackRecordData = {
            "female" : this.femaleId
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
      header: 'Female',
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
      header: 'Female',
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
            this.submitEditedFemale();
          }
        }
      ]
    });
    await alert.present();
  }

}
