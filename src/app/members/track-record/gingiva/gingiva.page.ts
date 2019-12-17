import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gingiva',
  templateUrl: './gingiva.page.html',
  styleUrls: ['./gingiva.page.scss'],
})
export class GingivaPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly : boolean;
  hasGingiva : boolean;
  gingivaId : string;

  attachedGingivaType : any = { "type" : '' };
  frenularAttachmentType : any = { "type" : '' };
  radioGraphStages : any = { "stage" : '' };
  radioGraphHVType : any = { "type" : '' };
  radioGraphGLType : any = { "type" : '' };

  attachedGingiva : string;
  frenularAttachment : string;
  radioGraphBoneLossStage : string;
  radioGraphHV : string;
  radioGraphGL : string;
  color : string;
  consistency : string;
  contour : string;
  texture : string;

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
      this.apiService.getGingiva(this.track_record['id']).subscribe((val) => {
        if(val==null){
          this.hasGingiva = false;
        }else{
          this.hasGingiva = true;
          this.attachedGingiva = val['attached_gingiva']
          this.attachedGingivaType = {
            "type" : this.attachedGingiva
          }
          this.frenularAttachment = val['frenular_attachment']
          this.frenularAttachmentType = {
            "type" : this.frenularAttachment
          }
          this.radioGraphBoneLossStage = val['radiographic_stage']
          this.radioGraphStages = {
            "stage" : this.radioGraphBoneLossStage
          }
          this.radioGraphHV = val['radiographic_hv']
          this.radioGraphHVType = {
            "type" : this.radioGraphHV
          }
          this.radioGraphGL = val['radiographic_gl']
          this.radioGraphGLType = {
            "type" : this.radioGraphGL
          }
          this.color = val['color']
          this.consistency = val['consistency']
          this.contour = val['contour']
          this.texture = val['texture']
        }
        this.loader = false;
      })
    }, 2000)
  }

  editGingiva(){
    this.isReadOnly = false;
  }

  cancelEdit(){
    this.isReadOnly = true;
  }

  submitEditedGingiva(){
    this.loader = true;
    this.isReadOnly = true;

    if(this.hasGingiva){
      let gingivaData = {
        "gingiva" : {
          "attached_gingiva": this.attachedGingiva,
          "frenular_attachment": this.frenularAttachment,
          "radiographic_stage": this.radioGraphBoneLossStage,
          "radiographic_hv": this.radioGraphHV,
          "radiographic_gl": this.radioGraphGL,
          "color": this.color,
          "consistency": this.consistency,
          "contour": this.contour,
          "texture": this.texture
        }
      }
      this.debouncer = setTimeout(() => {
        this.apiService.updateGingiva(gingivaData, this.track_record['id']).then(res => {
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
      let gingivaData = {
        "attached_gingiva": this.attachedGingiva,
        "frenular_attachment": this.frenularAttachment,
        "radiographic_stage": this.radioGraphBoneLossStage,
        "radiographic_hv": this.radioGraphHV,
        "radiographic_gl": this.radioGraphGL,
        "color": this.color,
        "consistency": this.consistency,
        "contour": this.contour,
        "texture": this.texture
      }

      this.debouncer = setTimeout(() => {
        this.apiService.addGingiva(gingivaData).then(res => {
          this.gingivaId = res['id']
          let trackRecordData = {
            "gingiva" : this.gingivaId
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

  onChangeAttachedGingiva($event){
    this.attachedGingivaType.type = $event.target.value;
    this.attachedGingiva = $event.target.value;
    console.log(this.attachedGingiva);
  }
  
  onChangeFrenularAttachment($event){
    this.frenularAttachmentType.type = $event.target.value;
    this.frenularAttachment = $event.target.value;
    console.log(this.frenularAttachment);
  }

  onChangeStages($event){
    this.radioGraphStages.stage = $event.target.value;
    this.radioGraphBoneLossStage = $event.target.value;
    console.log(this.radioGraphBoneLossStage);
  }

  onChangeGL($event){
    this.radioGraphGLType.type = $event.target.value;
    this.radioGraphGL = $event.target.value;
    console.log(this.radioGraphGL);
  }

  onChangeHV($event){
    this.radioGraphHVType.type = $event.target.value;
    this.radioGraphHV = $event.target.value;
    console.log(this.radioGraphHV);
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Gingiva',
      message: 'Successfully updated',
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
      header: 'Gingiva',
      message: 'Do you want to send this update?',
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
            this.submitEditedGingiva();
          }
        }
      ]
    });
    await alert.present();
  }
}