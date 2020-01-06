import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-occlusion',
  templateUrl: './occlusion.page.html',
  styleUrls: ['./occlusion.page.scss'],
})
export class OcclusionPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly : boolean;
  hasOcclusion : boolean;
  occlusionId : string;
  
  occlusionClass : any = { "class" : '' };
  plaqueType : any = { "type" : '' };
  enamelType : any[] = [];

  occlusion : string;
  otherOcclusal : string;
  oralHabits : string;
  plaque : string;
  erosion : boolean;
  demineralization : boolean;
  attrition : boolean;
  generalized : boolean;
  abfraction : boolean;
  fluorosis : boolean;
  abrasion : boolean;
  generalizedDesc : string;
  localized : boolean;
  localizedDesc : string;

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
      this.apiService.getOcclusion(this.track_record['id']).subscribe((val) => {
        if(val==null){
          this.hasOcclusion = false;
        }else{
          this.hasOcclusion = true;
          this.occlusion = val['occlusion_class']
          this.occlusionClass = {
            "class" : this.occlusion
          }
          this.otherOcclusal = val['other_occlusal']
          this.oralHabits = val['oral_habits']
          this.plaque = val['plaque']
          this.plaqueType = {
            "type" : this.plaque
          }
          this.erosion = val['erosion']
          this.demineralization = val['demineralization']
          this.attrition = val['attrition']
          this.abfraction = val['abfraction']
          this.fluorosis = val['fluorosis']
          this.abrasion = val['abrasion']
          this.generalized = val['generalized']
          this.localized = val['localized']
          this.generalizedDesc = val['generalized_desc']
          this.localizedDesc = val['localized_desc']
        }
        this.loader = false;
      })
    }, 2000)
  }

  editOcclusion(){
    this.isReadOnly = false;
    this.enamelType = [
      {
        id : 1,
        name : "Erosion",
        value : this.erosion
      },
      {
        id : 2,
        name : "Demineralization",
        value : this.demineralization
      },
      {
        id : 3,
        name : "Attrition",
        value : this.attrition
      },
      {
        id : 4,
        name : "Abfraction",
        value : this.abfraction
      },
      {
        id : 5,
        name : "Fluorosis",
        value : this.fluorosis
      },
      {
        id : 6,
        name : "Abrasion",
        value : this.abrasion
      },
    ]
  }

  cancelEdit(){
    this.isReadOnly = true;
  }

  submitEditedOcclusion(){
    this.loader = true;
    this.isReadOnly = true;

    if(this.hasOcclusion){
      let occlusionData = {
        "occlusion" : {
          "occlusion_class": this.occlusion,
          "other_occlusal": this.otherOcclusal,
          "oral_habits": this.oralHabits,
          "plaque": this.plaque,
          "generalized": this.generalized,
          "localized": this.localized,
          "generalized_desc": this.generalizedDesc,
          "localized_desc": this.localizedDesc,
          "erosion": this.erosion,
          "demineralization": this.demineralization,
          "attrition": this.attrition,
          "abfraction": this.abfraction,
          "fluorosis": this.fluorosis,
          "abrasion": this.abrasion
        }
      }
      this.debouncer = setTimeout(() => {
        this.apiService.updateOcclusion(occlusionData, this.track_record['id']).then(res => {
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
      let occlusionData = {
        "occlusion_class": this.occlusion,
        "other_occlusal": this.otherOcclusal,
        "oral_habits": this.oralHabits,
        "plaque": this.plaque,
        "generalized": this.generalized,
        "localized": this.localized,
        "generalized_desc": this.generalizedDesc,
        "localized_desc": this.localizedDesc,
        "erosion": this.erosion,
        "demineralization": this.demineralization,
        "attrition": this.attrition,
        "abfraction": this.abfraction,
        "fluorosis": this.fluorosis,
        "abrasion": this.abrasion
      }

      this.debouncer = setTimeout(() => {
        this.apiService.addOcclusion(occlusionData).then(res => {
          this.occlusionId = res['id']
          let trackRecordData = {
            "occlusion" : this.occlusionId
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

  onChangeClass($event){
    this.occlusionClass.class = $event.target.value;
    this.occlusion = $event.target.value;
    console.log(this.occlusion);
  }

  onChangePlaque($event){
    this.plaqueType.type = $event.target.value;
    this.plaque = $event.target.value;
    console.log(this.plaque);
  }

  onChangeEnamel($event){
    var selectedItems = $event.target.value;
    if(selectedItems.includes(1)){
      this.erosion = true;
    }else{
      this.erosion = false;
    }
    if(selectedItems.includes(2)){
      this.demineralization = true;
    }else{
      this.demineralization = false;
    }
    if(selectedItems.includes(3)){
      this.attrition = true;
    }else{
      this.attrition = false;
    }
    if(selectedItems.includes(4)){
      this.abfraction = true;
    }else{
      this.abfraction = false;
    }
    if(selectedItems.includes(5)){
      this.fluorosis = true;
    }else{
      this.fluorosis = false;
    }
    if(selectedItems.includes(6)){
      this.abrasion = true;
    }else{
      this.abrasion = false;
    }
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Occlusion',
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
      header: 'Occlusion',
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
            this.submitEditedOcclusion();
          }
        }
      ]
    });
    await alert.present();
  }
}