import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';
import {format} from "date-fns";

@Component({
  selector: 'app-dental-history',
  templateUrl: './dental-history.page.html',
  styleUrls: ['./dental-history.page.scss'],
})
export class DentalHistoryPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly : boolean;
  hasDentalHistory : boolean;
  dentalHistoryId : string;

  dateLastVisit : any;
  freqDentalVisit : any;
  procLastVisit : string;
  exposureAnesthesia : string;
  dentalComplications : string;
  brush : any;
  floss : any;
  rinse : any;

  smile : boolean;
  gumsBleedBrush : boolean;
  toothExtraction : boolean;
  bledExtraction : boolean;
  orthodomic : boolean;
  cold : boolean;
  periodental : boolean;
  bleed : boolean;
  denture : boolean;
  jawPain : boolean;
  foodCatch : boolean;

  relevantSmile : string;
  relevantGumsBleedBrush : string;
  relevantToothExtraction : string;
  relevantBledExtraction : string;
  relevantOrthodomic : string;
  relevantCold : string;
  relevantPeriodental : string;
  relevantBleed : string;
  relevantDenture : string;
  relevantJawPain : string;
  relevantFoodCatch : string;

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
      this.apiService.getDentalHistory(this.track_record['id']).subscribe((val) => {
        if(val==null){
          this.hasDentalHistory = false;
        }else{
          this.hasDentalHistory = true;
          this.dateLastVisit = val['date_last_visit']
          this.freqDentalVisit = val['freq_dental_visit']
          this.procLastVisit = val['proc_last_visit']
          this.exposureAnesthesia = val['exposure_anesthesia']
          this.dentalComplications = val['complications_dental']
          this.brush = val['brush']
          this.floss = val['floss']
          this.rinse = val['rinse']
          this.smile = val['smile']
          this.relevantSmile = val['relevant_smile']
          this.gumsBleedBrush = val['gums']
          this.relevantGumsBleedBrush = val['relevant_gums']
          this.toothExtraction = val['extraction']
          this.relevantToothExtraction = val['relevant_extraction']
          this.bledExtraction = val['bled']
          this.relevantBledExtraction = val['relevant_bled']
          this.orthodomic = val['orthodomic']
          this.relevantOrthodomic = val['relevant_orthodomic']
          this.cold = val['cold']
          this.relevantCold = val['relevant_cold']
          this.periodental = val['periodental']
          this.relevantPeriodental = val['relevant_periodental']
          this.bleed = val['bleed']
          this.relevantBleed = val['relevant_bleed']
          this.denture = val['denture']
          this.relevantDenture = val['relevant_denture']
          this.jawPain = val['jaw_pain']
          this.relevantJawPain = val['relevant_jaw_pain']
          this.foodCatch = val['catch']
          this.relevantFoodCatch = val['relevant_catch']
        }
        this.loader = false
      })
    }, 2000)
  }

  editDentalHistory(){
    this.isReadOnly = false;
  }

  cancelEdit(){
    this.isReadOnly = true;
  }

  submitEditedDentalHistory(){
    this.loader = true;
    this.isReadOnly = true;

    if(this.hasDentalHistory){
      let dentalHistoryData = {
        "dental_history" : {
          "freq_dental_visit": this.freqDentalVisit,
          "proc_last_visit": this.procLastVisit,
          "exposure_anesthesia": this.exposureAnesthesia,
          "complications_dental": this.dentalComplications,
          "brush": this.brush,
          "floss": this.floss,
          "rinse": this.rinse,
          "relevant_smile": this.relevantSmile,
          "relevant_extraction": this.relevantToothExtraction,
          "relevant_orthodomic": this.relevantOrthodomic,
          "relevant_bled": this.relevantBledExtraction,
          "relevant_gums": this.relevantGumsBleedBrush,
          "relevant_cold": this.relevantCold,
          "relevant_denture": this.relevantDenture,
          "relevant_periodental": this.relevantPeriodental,
          "relevant_bleed": this.relevantBleed,
          "relevant_jaw_pain": this.relevantJawPain,
          "relevant_catch": this.relevantFoodCatch,
          "date_last_visit": format(new Date(this.dateLastVisit), "yyyy-MM-dd"),
          "smile": this.smile,
          "gums": this.gumsBleedBrush,
          "extraction": this.toothExtraction,
          "bled": this.bledExtraction,
          "orthodomic": this.orthodomic,
          "cold": this.cold,
          "periodental": this.periodental,
          "bleed": this.bleed,
          "denture": this.denture,
          "jaw_pain": this.jawPain,
          "catch": this.foodCatch
        }
      }

      this.debouncer = setTimeout(() => {
        this.apiService.updateDentalHistory(dentalHistoryData, this.track_record['id']).then(res => {
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
      let dentalHistoryData = {
        "freq_dental_visit": this.freqDentalVisit,
        "proc_last_visit": this.procLastVisit,
        "exposure_anesthesia": this.exposureAnesthesia,
        "complications_dental": this.dentalComplications,
        "brush": this.brush,
        "floss": this.floss,
        "rinse": this.rinse,
        "relevant_smile": this.relevantSmile,
        "relevant_extraction": this.relevantToothExtraction,
        "relevant_orthodomic": this.relevantOrthodomic,
        "relevant_bled": this.relevantBledExtraction,
        "relevant_gums": this.relevantGumsBleedBrush,
        "relevant_cold": this.relevantCold,
        "relevant_denture": this.relevantDenture,
        "relevant_periodental": this.relevantPeriodental,
        "relevant_bleed": this.relevantBleed,
        "relevant_jaw_pain": this.relevantJawPain,
        "relevant_catch": this.relevantFoodCatch,
        "date_last_visit": format(new Date(this.dateLastVisit), "yyyy-MM-dd"),
        "smile": this.smile,
        "gums": this.gumsBleedBrush,
        "extraction": this.toothExtraction,
        "bled": this.bledExtraction,
        "orthodomic": this.orthodomic,
        "cold": this.cold,
        "periodental": this.periodental,
        "bleed": this.bleed,
        "denture": this.denture,
        "jaw_pain": this.jawPain,
        "catch": this.foodCatch
      }

      this.debouncer = setTimeout(() => {
        this.apiService.addDentalHistory(dentalHistoryData).then(res => {
          this.dentalHistoryId = res['id']
          let trackRecordData = {
            "dental_history" : this.dentalHistoryId
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
      header: 'Dental History',
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
      header: 'Dental History',
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
            this.submitEditedDentalHistory();
          }
        }
      ]
    });
    await alert.present();
  }

}