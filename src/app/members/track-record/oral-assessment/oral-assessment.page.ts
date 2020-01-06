import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oral-assessment',
  templateUrl: './oral-assessment.page.html',
  styleUrls: ['./oral-assessment.page.scss'],
})
export class OralAssessmentPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly : boolean;
  hasOralAssessment : boolean;
  OralAssessmentId : string;

  skinDesc : string;
  eyesDesc : string;
  neckDesc : string;
  lympDesc : string;
  lipsDesc : string;
  buccalMucosaDesc : string;
  vestibuleDesc : string;
  alveolarRidgeDesc : string;
  palateDesc : string;
  oroPharynxDesc : string;
  tongueDesc : string;
  floorOfMouthDesc : string;
  salivaryGlandsDesc : string;
  TMDDesc : string;

  skin : boolean;
  eyes : boolean;
  neck : boolean;
  lymp : boolean;
  lips : boolean;
  buccalMucosa : boolean;
  vestibule : boolean;
  alveolarRidge : boolean;
  palate : boolean;
  oroPharynx : boolean;
  tongue : boolean;
  floorOfMouth : boolean;
  salivaryGlands : boolean;
  TMD : boolean;



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
      this.apiService.getOralAssessment(this.track_record['id']).subscribe((val) => {
        if(val==null){
          this.hasOralAssessment = false;
          console.log('null');
        }else{
          this.hasOralAssessment = true;
          this.skinDesc = val['skin_desc']
          this.eyesDesc = val['eyes_desc']
          this.neckDesc = val['neck_desc']
          this.lympDesc = val['lymph_nodes_desc']
          this.lipsDesc = val['lips_desc']
          this.buccalMucosaDesc = val['buccal_mucosa_desc']
          this.vestibuleDesc = val['vestibule_desc']
          this.alveolarRidgeDesc = val['alveolar_ridge_desc']
          this.palateDesc = val['hard_palate_desc']
          this.oroPharynxDesc = val['oro_pharynx_desc']
          this.tongueDesc = val['tongue_desc']
          this.floorOfMouthDesc = val['mouth_floor_desc']
          this.salivaryGlandsDesc = val['salivary_glands_desc']
          this.TMDDesc = val['TMD_desc']

          this.skin = val['skin']
          this.eyes = val['eyes']
          this.neck = val['neck']
          this.lymp = val['lymph_nodes']
          this.TMD = val['TMD']
          this.lips = val['lips']
          this.buccalMucosa = val['buccal_mucosa']
          this.vestibule = val['vestibule']
          this.alveolarRidge = val['alveolar_ridge']
          this.palate = val['hard_palate']
          this.oroPharynx = val['oro_pharynx']
          this.tongue = val['tongue']
          this.floorOfMouth = val['mouth_floor']
          this.salivaryGlands = val['salivary_glands']
        }
        this.loader = false;
      })
    }, 2000)

  }

  editOralAssessment(){
    this.isReadOnly = false;
  }

  cancelEdit(){
    this.isReadOnly = true;
  }

  submitEditedOralAssessment(){
    this.loader = true;
    this.isReadOnly = true;
    
    if(this.hasOralAssessment){
      let oralAssessmentData = {
        "oral_assessment" : {
          "skin" : this.skin,
          "skin_desc" : this.skinDesc,
          "eyes" : this.eyes,
          "eyes_desc" : this.eyesDesc,
          "neck" : this.neck,
          "neck_desc" : this.neckDesc,
          "TMD" : this.TMD,
          "TMD_desc" : this.TMDDesc,
          "lymph_nodes" : this.lymp,
          "lymph_nodes_desc" : this.lympDesc,
          "lips" : this.lips,
          "lips_desc" : this.lipsDesc,
          "buccal_mucosa" : this.buccalMucosa,
          "buccal_mucosa_desc" : this.buccalMucosaDesc,
          "vestibule" : this.vestibule,
          "vestibule_desc" : this.vestibuleDesc,
          "alveolar_ridge" : this.alveolarRidge,
          "alveolar_ridge_desc" : this.alveolarRidgeDesc,
          "hard_palate" : this.palate,
          "hard_palate_desc" : this.palateDesc,
          "oro_pharynx" : this.oroPharynx,
          "oro_pharynx_desc" : this.oroPharynxDesc,
          "tongue" : this.tongue,
          "tongue_desc" : this.tongueDesc,
          "mouth_floor" : this.floorOfMouth,
          "mouth_floor_desc" : this.floorOfMouthDesc,
          "salivary_glands" : this.salivaryGlands,
          "salivary_glands_desc" : this.salivaryGlandsDesc,
          "datetime_added" : new Date(),
        }
      }

      this.debouncer = setTimeout(() => {
        this.apiService.updateOralAssessment(oralAssessmentData, this.track_record['id']).then(res => {
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
      let oralAssessmentData = {
          "skin" : this.skin,
          "skin_desc" : this.skinDesc,
          "eyes" : this.eyes,
          "eyes_desc" : this.eyesDesc,
          "neck" : this.neck,
          "neck_desc" : this.neckDesc,
          "TMD" : this.TMD,
          "TMD_desc" : this.TMDDesc,
          "lymph_nodes" : this.lymp,
          "lymph_nodes_desc" : this.lympDesc,
          "lips" : this.lips,
          "lips_desc" : this.lipsDesc,
          "buccal_mucosa" : this.buccalMucosa,
          "buccal_mucosa_desc" : this.buccalMucosaDesc,
          "vestibule" : this.vestibule,
          "vestibule_desc" : this.vestibuleDesc,
          "alveolar_ridge" : this.alveolarRidge,
          "alveolar_ridge_desc" : this.alveolarRidgeDesc,
          "hard_palate" : this.palate,
          "hard_palate_desc" : this.palateDesc,
          "oro_pharynx" : this.oroPharynx,
          "oro_pharynx_desc" : this.oroPharynxDesc,
          "tongue" : this.tongue,
          "tongue_desc" : this.tongueDesc,
          "mouth_floor" : this.floorOfMouth,
          "mouth_floor_desc" : this.floorOfMouthDesc,
          "salivary_glands" : this.salivaryGlands,
          "salivary_glands_desc" : this.salivaryGlandsDesc,
          "datetime_added" : new Date(),
        }

        this.debouncer = setTimeout(() => {
          this.apiService.addOralAssessment(oralAssessmentData).then(res => {
            this.OralAssessmentId = res['id']
            let trackRecordData = {
              "oral_assessment" : this.OralAssessmentId
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
      header: 'Oral Assessment',
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
      header: 'Oral Assessment',
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
            this.submitEditedOralAssessment();
          }
        }
      ]
    });
    await alert.present();
  }

}
