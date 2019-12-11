import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.page.html',
  styleUrls: ['./allergies.page.scss'],
})
export class AllergiesPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : boolean;
  isReadOnly = true;
  hasAllergy : boolean;
  allergyId : string;

  aspirin : boolean;
  penicillin : boolean;
  latex : boolean;
  metal : boolean;
  none : boolean;
  others : string;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.apiService.getAllergies(this.track_record['id']).subscribe((val) => {
        if(val==null){
          this.hasAllergy = false;
        }else{
          this.hasAllergy = true;
          this.aspirin = val['aspirin'];
          this.penicillin = val['penicillin'];
          this.latex = val['latex'];
          this.metal = val['metal'];
          this.none = val['none'];
          this.others = val['others'];
        }
        this.loader = false;
      })
    }, 2000)
  }

  editAllergies(){
    this.isReadOnly = false;
  }

  submitEditedAllergies(){
    this.loader = true;
    this.isReadOnly = true;

    if(this.hasAllergy){  
      this.debouncer = setTimeout(() => {
        
        let allergiesData = {
          "allergies": {
            "others": this.others,
            "aspirin": this.aspirin,
            "penicillin": this.penicillin,
            "latex": this.latex,
            "metal": this.metal,
            "none": this.none,
            "datetime_added": new Date(),
          }
        }

        this.apiService.updateAllergies(allergiesData, this.track_record['id']).then(res => {
          this.loader = false;
          this.isReadOnly = true;
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

      let allergyData = {
        "others": this.others,
        "aspirin": this.aspirin,
        "penicillin": this.penicillin,
        "latex": this.latex,
        "metal": this.metal,
        "none": this.none,
        "datetime_added": new Date(),
      }

      this.apiService.addAllergies(allergyData).then(res => {
        this.allergyId = res['id']
        let trackRecordData = {
          "allergy" : this.allergyId
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
    }
  }

  cancelEdit(){
    this.isReadOnly = true;
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
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
      header: 'Allergies',
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
            this.submitEditedAllergies()
          }
        }
      ]
    });
    await alert.present();
  }


}