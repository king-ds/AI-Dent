import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vital-sign',
  templateUrl: './vital-sign.page.html',
  styleUrls: ['./vital-sign.page.scss'],
})
export class VitalSignPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly = true;
  isEmpty : boolean;
  submitAttempt : boolean;
  addNewVitalSign : boolean;

  vitalSignForm : FormGroup;
  results : Observable<any>;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,
              public formBuilder : FormBuilder) {
    
    this.vitalSignForm = formBuilder.group({
      BP_1 : ['', Validators.required],
      BP_2 : ['', Validators.required],
      PR : ['', Validators.required],
      RR : ['', Validators.required],
      TEMP : ['', Validators.required],
    })

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.checkVitalSignFeed();
      this.loader = false;
    }, 2000)
  }

  checkVitalSignFeed(){
    this.apiService.getVitalSign(this.track_record['id']).subscribe(val => {
      if(val == ''){
        this.isEmpty = true;
      }else{
        this.isEmpty = false;
        this.getVitalSignFeed();
      }
    })
  }

  getVitalSignFeed(){
    this.results = this.apiService.getVitalSign(this.track_record['id']);
    this.results.subscribe((val) => {
      console.log(val);
    })
  }

  deleteVitalSign(vitalSignId){
    this.loader = true
    this.apiService.deleteVitalSign(vitalSignId).then((val)=>{
      this.deleteSuccessMessage();
      console.log(val);
    })
    .catch(error => {
      this.errorMessage();
      console.log(error);
    });
  }

  attemptAddVitalSign(){
    this.addNewVitalSign = true;
  }

  async confirmationDelete(vitalSignId){

    const alert = await this.alertController.create({
      header: 'Remove Vital Sign',
      message: 'Do you want to delete this record? Please note this cannot be undone.',
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
            this.deleteVitalSign(vitalSignId);
          }
        }
      ]
    });
    await alert.present();
  }

  addVitalSign(){
    this.submitAttempt = true;
    let vitalSignData = {
      "BP_1" : this.vitalSignForm.value.BP_1,
      "BP_2" : this.vitalSignForm.value.BP_2,
      "PR" : this.vitalSignForm.value.PR,
      "RR" : this.vitalSignForm.value.RR,
      "TEMP" : this.vitalSignForm.value.TEMP,
      "track_record" : this.track_record['id'],
    }
    if(!this.vitalSignForm.valid){
      console.log("Invalid");
    }else{
      this.loader = true;
      this.apiService.addVitalSign(vitalSignData).then((val) =>{
        this.loader = false;
        this.addSuccessMessage();
      })
      .catch(error => {
        this.loader = false;
        this.errorMessage();
        console.log(error);
      })
    }
  }

  cancelVitalSign(){
    this.addNewVitalSign = false;
  }

  async addSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Successful',
      message: 'New vital sign has been added.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.addNewVitalSign = false;
          this.ionViewWillEnter();
        }
      }],
    });
    await alert.present();
  }

  async deleteSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Successful',
      message: 'Vital sign has been removed.',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.addNewVitalSign = false;
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
      buttons: [{
        text:'Ok',
        handler: () => {
        }
      }],
    });
    await alert.present();
  }
}