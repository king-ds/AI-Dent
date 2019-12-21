import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { StorageService } from './../../services/storage.service';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-instructor-track-records',
  templateUrl: './instructor-track-records.page.html',
  styleUrls: ['./instructor-track-records.page.scss'],
})
export class InstructorTrackRecordsPage implements OnInit {

  debouncer : any;
  loader : boolean;
  track_record : any;
  empty : any;

  instructor : any;
  results : any;
  searchTerm : string;

  constructor(private apiService : ApiService,
              private storageService : StorageService,
              private router : Router,
              private alertController : AlertController,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.storageService.getObject('instructor').then((result) => {
      this.instructor = result;
      this.debouncer = setTimeout(() => {
        this.checkMyList();
        this.loader = false;
      }, 2000)
    })
  }

  searchChanged(){
    this.results = this.apiService.searchInstructorTrackRecord(this.searchTerm, this.instructor['id']);
  }

  checkMyList(){
    this.apiService.getInstructorTrackRecord(this.instructor['id']).subscribe(val => {
      if(val == ''){
        this.empty = true;
      }else{
        this.empty = false;
        this.results = this.apiService.getInstructorTrackRecord(this.instructor['id']);
      }
    });
  }

  goToTrackRecord(item){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : item
      }
    };

    this.router.navigate(['members', 'instructor-selection'], navigationExtras);
  }

  approveTrackRecord(item){
    this.loader = true
    setTimeout(() => {
      let trackRecordData = {
        'is_approved_instructor' : true,
        'pending_for_approval' : false,
      }

      this.apiService.updateTrackRecord(trackRecordData, item.id).then((res) => {
        this.successMessage();
      })
      .catch(error => {
        this.errorMessage();
        console.log(error);
      })
    }, 2000)
  }
  
  async showTrackRecordApprovalMessage(item){
    const alert = await this.alertController.create({
      header: 'Track Record',
      message: 'Do you want to approve this record? Please note that this cannot be undone.',
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
            this.approveTrackRecord(item);
          }
        }
      ]
    });
    await alert.present();
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Great',
      message: 'Track record has been approved.',
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
          this.loader = false;
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
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
          this.loader = false;
        }
      }],
    });
    await alert.present();
  }
}