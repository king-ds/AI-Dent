import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social-history',
  templateUrl: './social-history.page.html',
  styleUrls: ['./social-history.page.scss'],
})
export class SocialHistoryPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly : boolean;
  hasSocialHistory : boolean;
  socialHistoryId : string;

  tobacco : boolean;
  cigarettes : boolean;
  vape : boolean;
  drugsForRecreation : boolean;
  drugsForTherapeutic : boolean;
  alcoholicBeverages : boolean;

  kindTobacco : string;
  oftenTobacco : string;
  yearsTobacco : string;
  stopTobacco : string;

  kindCigarettes : string;
  oftenCigarettes : string;
  yearsCigarettes : string;
  stopCigarettes : string;

  kindVape : string;
  oftenVape : string;
  yearsVape : string;
  stopVape : string;

  kindRecreation : string;
  oftenRecreation : string;
  yearsRecreation : string;
  stopRecreation : string;

  kindTherapeutic : string;
  oftenTherapeutic : string;
  yearsTherapeutic : string;
  stopTherapeutic : string;

  kindAlcoholic : string;
  oftenAlcoholic : string;
  yearsAlcoholic : string;
  stopAlcoholic : string;

  dateTimeAdded : string;

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

      this.apiService.getSocialHistory(this.track_record['id']).subscribe((val) =>{
        if(val==null){
          this.hasSocialHistory = false;
          console.log('null')
        }else{
          this.hasSocialHistory = true;
          this.tobacco = val['using_tobacco']
          this.cigarettes = val['using_cigarettes']
          this.vape = val['using_vape']
          this.drugsForRecreation = val['using_recreation']
          this.drugsForTherapeutic = val['using_therapeutic']
          this.alcoholicBeverages = val['drink_alcoholic']

          this.kindTobacco = val['kind_tobacco']
          this.oftenTobacco = val['often_tobacco']
          this.yearsTobacco = val['years_tobacco']
          this.stopTobacco = val['stop_tobacco']

          this.kindCigarettes = val['kind_cigarettes']
          this.oftenCigarettes = val['often_cigarettes']
          this.yearsCigarettes = val['years_cigarettes']
          this.stopCigarettes = val['stop_cigarettes']

          this.kindVape = val['kind_vape']
          this.oftenVape = val['often_vape']
          this.yearsVape = val['years_vape']
          this.stopVape = val['stop_vape']

          this.kindRecreation = val['kind_recreation']
          this.oftenRecreation = val['often_recreation']
          this.yearsRecreation = val['years_recreation']
          this.stopRecreation = val['stop_recreation']

          this.kindTherapeutic = val['kind_therapeutic']
          this.oftenTherapeutic = val['often_therapeutic']
          this.yearsTherapeutic = val['years_therapeutic']
          this.stopTherapeutic = val['stop_therapeutic']

          this.kindAlcoholic = val['kind_alcoholic']
          this.oftenAlcoholic = val['often_alcoholic']
          this.yearsAlcoholic = val['years_alcoholic']
          this.stopAlcoholic = val['stop_alcoholic']

          this.dateTimeAdded = val['datetime_added']
        }
        this.loader = false;
      })
    },2000)
  }

  editSocialHistory(){
    this.isReadOnly = false;
  }

  cancelEdit(){
    this.isReadOnly = true;
  }

  submitEditedSocialHistory(){
    this.loader = true;
    this.isReadOnly = true;

    if(this.hasSocialHistory){
      let socialHistoryData = {
        "social_history" : {
          "kind_tobacco": this.kindTobacco,
          "often_tobacco": this.oftenTobacco,
          "years_tobacco": this.yearsTobacco,
          "stop_tobacco": this.stopTobacco,
          "kind_cigarettes": this.kindCigarettes,
          "often_cigarettes": this.oftenCigarettes,
          "years_cigarettes": this.yearsCigarettes,
          "stop_cigarettes": this.stopCigarettes,
          "kind_vape": this.kindVape,
          "often_vape": this.oftenVape,
          "years_vape": this.yearsVape,
          "stop_vape": this.stopVape,
          "kind_recreation": this.kindRecreation,
          "often_recreation": this.oftenRecreation,
          "years_recreation": this.yearsRecreation,
          "stop_recreation": this.stopRecreation,
          "kind_therapeutic": this.kindTherapeutic,
          "often_therapeutic": this.oftenTherapeutic,
          "years_therapeutic": this.yearsTherapeutic,
          "stop_therapeutic": this.stopTherapeutic,
          "kind_alcoholic": this.kindAlcoholic,
          "often_alcoholic": this.oftenAlcoholic,
          "years_alcoholic": this.yearsAlcoholic,
          "stop_alcoholic": this.stopAlcoholic,
          "using_tobacco": this.tobacco,
          "using_cigarettes": this.cigarettes,
          "using_vape": this.vape,
          "using_recreation": this.drugsForRecreation,
          "using_therapeutic": this.drugsForTherapeutic,
          "drink_alcoholic": this.alcoholicBeverages,
          "datetime_added": new Date()
        }
      }

      this.debouncer = setTimeout(() => {
        this.apiService.updateSocialHistory(socialHistoryData, this.track_record['id']).then(res => {
          this.loader = false;
          this.successMessage();
        })
        .catch(error => {
          this.loader = false;
          this.errorMessage();
          console.log(error);
        })
      }, 2000)
    }else{
      let socialHistoryData = {
        "kind_tobacco": this.kindTobacco,
        "often_tobacco": this.oftenTobacco,
        "years_tobacco": this.yearsTobacco,
        "stop_tobacco": this.stopTobacco,
        "kind_cigarettes": this.kindCigarettes,
        "often_cigarettes": this.oftenCigarettes,
        "years_cigarettes": this.yearsCigarettes,
        "stop_cigarettes": this.stopCigarettes,
        "kind_vape": this.kindVape,
        "often_vape": this.oftenVape,
        "years_vape": this.yearsVape,
        "stop_vape": this.stopVape,
        "kind_recreation": this.kindRecreation,
        "often_recreation": this.oftenRecreation,
        "years_recreation": this.yearsRecreation,
        "stop_recreation": this.stopRecreation,
        "kind_therapeutic": this.kindTherapeutic,
        "often_therapeutic": this.oftenTherapeutic,
        "years_therapeutic": this.yearsTherapeutic,
        "stop_therapeutic": this.stopTherapeutic,
        "kind_alcoholic": this.kindAlcoholic,
        "often_alcoholic": this.oftenAlcoholic,
        "years_alcoholic": this.yearsAlcoholic,
        "stop_alcoholic": this.stopAlcoholic,
        "using_tobacco": this.tobacco,
        "using_cigarettes": this.cigarettes,
        "using_vape": this.vape,
        "using_recreation": this.drugsForRecreation,
        "using_therapeutic": this.drugsForTherapeutic,
        "drink_alcoholic": this.alcoholicBeverages,
        "datetime_added": new Date(),
      }

      this.debouncer = setTimeout(() => {
        this.apiService.addSocialHistory(socialHistoryData).then(res => {
          this.socialHistoryId = res['id']
          let trackRecordData = {
            "social_history" : this.socialHistoryId
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
        })
      }, 2000)
    }
  }
  
  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Social History',
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
      header: 'Social History',
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
            this.submitEditedSocialHistory();
          }
        }
      ]
    });
    await alert.present();
  }
}
