import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-treatment-record',
  templateUrl: './treatment-record.page.html',
  styleUrls: ['./treatment-record.page.scss'],
})
export class TreatmentRecordPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isEmpty : boolean;

  treatmentRecords : any;
  cleanedTreatmentRecords : any[] = [];

  tableStyle = 'bootstrap';

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.cleanedTreatmentRecords = [];
    this.apiService.getTreatmentRecord(this.track_record[0]['id']).subscribe(val => {
      if(val == ''){
        this.isEmpty = true;
      }else{
        this.isEmpty = false;
        this.treatmentRecords = JSON.parse(JSON.stringify(val));
        console.log(this.treatmentRecords);
        for(var i=0; i<this.treatmentRecords.length; i++){
          this.cleanedTreatmentRecords.push({ 
                                      'id' : this.treatmentRecords[i]['id'],
                                      'date' : this.treatmentRecords[i]['date'],
                                      'clinician' : this.treatmentRecords[i]['clinician']['last_name'],
                                      'procedure' : this.treatmentRecords[i]['procedure'],
                                      'approved' : this.treatmentRecords[i]['patient_signature'], })
        }
        this.treatmentRecords = this.cleanedTreatmentRecords;
      }
    });
  }

  doRefresh(event){
    this.ionViewWillEnter();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async approve(row) {
    const alert = await this.alertController.create({
      header: 'Treatment Record Request',
      message: 'I hereby confirm that a dental procedure was done on me.',
      cssClass: 'terms-conditions',
      buttons: [
        {
          text: 'Disagree',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Agree',
          handler: () => {
            let treatmentRecordData = {
              'id' : row['id'],
              'patient_signature' : true,
            }
            this.apiService.updateTreatmentRecord(treatmentRecordData, row['id']).then(() => {
              this.ionViewWillEnter();
            })
            .catch(error => {
              console.log(error);
              this.errorMessage();
            });
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