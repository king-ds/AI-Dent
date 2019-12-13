import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit {

  clinician : string;
  track_record = null;
  track_record_id : string;
  isFemale : boolean = false;

  constructor(private apiService : ApiService,
              private activatedRoute : ActivatedRoute,
              private router : Router,
              private alertController : AlertController,) { }

  ngOnInit() {
    this.getPatientDetails();
  }

  getPatientDetails(){
    this.track_record_id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.track_record_id)
    this.apiService.getTrackRecord(this.track_record_id).subscribe(result => {
      this.track_record = result;
      if(this.track_record['patient']['gender'] == 'Female'){
        this.isFemale = true;
      }
    });
  }

  goToComplaint(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'complaint'], navigationExtras);
  }

  goToMedicalHistory(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    
    this.router.navigate(['members', 'medical-history'], navigationExtras);
  }

  goToMedicalHealthQuestionnaire(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'medical-health-questionnaire'], navigationExtras);
  }

  goToAllergies(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'allergies'], navigationExtras);
  }

  goToVitalSign(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'vital-sign'], navigationExtras);
  }

  goToFemale(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'female'], navigationExtras);
  }

  goToDentalChart(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.apiService.getDentalChart(this.track_record['id']).subscribe((val) => {
      if(val == ''){
        this.presentAlertRadio();
      }else{
        if(val[0]['kind'] == 'child'){
          this.router.navigate(['members', 'child-dental-chart'], navigationExtras);
        }else{
          this.router.navigate(['members', 'adult-dental-chart'], navigationExtras);
        }
      }
    })
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Dental Chart',
      message: 'Choose your dental chart',
      cssClass: 'alert-radio',
      inputs: [
        {
          name: 'child',
          type: 'radio',
          label: 'Child',
          value: 'child'
        },
        {
          name: 'adult',
          type: 'radio',
          label: 'Adult',
          value: 'adult'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data:string) => {
            let navigationExtras : NavigationExtras = {
              state : {
                track_record : this.track_record
              }
            };

            if(data == 'child'){
              let dentalChartData = {
                "track_record" : this.track_record['id'],
                "teeth_number" : 55,
                "quadrant" : 1,
                "kind" : "child",
              }

              this.apiService.addDentalChart(dentalChartData).then((res) => {
                this.router.navigate(['members', 'child-dental-chart'], navigationExtras);
              })
              .catch(error => {
                this.errorMessage();
                console.log(error);
              });

            }else{
              let dentalChartData = {
                "track_record" : this.track_record['id'],
                "teeth_number" : 18,
                "quadrant" : 1,
                "kind" : "adult",
              }

              this.apiService.addDentalChart(dentalChartData).then((res) => {
                this.router.navigate(['members', 'adult-dental-chart'], navigationExtras);
              })
              .catch(error => {
                this.errorMessage();
                console.log(error);
              })
            }
          }
        }
      ]
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