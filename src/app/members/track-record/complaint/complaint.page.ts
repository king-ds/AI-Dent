import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.page.html',
  styleUrls: ['./complaint.page.scss'],
})
export class ComplaintPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : boolean;
  isReadOnly = true;
  chiefComplaint : string;
  historyOfPresentIllness : string;
  hasComplaint : boolean;
  complaintId : string;

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
      this.apiService.getComplaint(this.track_record['id']).subscribe((val) => {
        if(val==null){
          this.hasComplaint = false;
        }else{
          this.hasComplaint = true;
          this.chiefComplaint = val['chief_complaint']
          this.historyOfPresentIllness = val['history_of_present_illness']
        }
        this.loader = false;
      })
    }, 2000)
  }

  editComplaint(){
    this.isReadOnly = false;
  }

  submitEditedComplaint(){
    this.loader = true;
    this.isReadOnly = true;

    if(this.hasComplaint){
      this.debouncer = setTimeout(() =>{

        let complaintData = {
          "additional_personal_data": {
            "chief_complaint": this.chiefComplaint,
            "history_of_present_illness": this.historyOfPresentIllness,
          }
        }

        this.apiService.updateComplaint(complaintData, this.track_record['id']).then(res => {
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

      let complaintData = {
        "chief_complaint" : this.chiefComplaint,
        "history_of_present_illness" : this.historyOfPresentIllness,
      }

      this.apiService.addComplaint(complaintData).then(res => {
        this.complaintId = res['id']
        let trackRecordData = {
          "additional_personal_data" : this.complaintId
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
      header: 'Complaint',
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
            this.submitEditedComplaint()
          }
        }
      ]
    });
    await alert.present();
  }

}
