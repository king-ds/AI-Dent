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

  patient : any;
  debouncer : any;
  loader : boolean;
  isReadOnly = true;
  chiefComplaint : string;
  historyOfPresentIllness : string;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,) {
 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.patient = this.router.getCurrentNavigation().extras.state.patient;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.apiService.getComplaint(this.patient['track_record']).subscribe((val) => {
        this.chiefComplaint = val['chief_complaint']
        this.historyOfPresentIllness = val['history_of_present_illness']
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

    let complaintData = {
      "additional_personal_data" : {
        "chief_complaint" : this.chiefComplaint,
        "history_of_present_illness" : this.historyOfPresentIllness,
      }
    }

    this.debouncer = setTimeout(() =>{
      this.apiService.updateComplaint(complaintData, this.patient['track_record']).then(res => {
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
      header: 'Complaint',
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
            this.submitEditedComplaint()
          }
        }
      ]
    });
    await alert.present();
  }

}
