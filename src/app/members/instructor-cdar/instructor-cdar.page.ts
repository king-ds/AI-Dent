import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { StorageService } from './../../services/storage.service';
import { format } from "date-fns";
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-instructor-cdar',
  templateUrl: './instructor-cdar.page.html',
  styleUrls: ['./instructor-cdar.page.scss'],
})
export class InstructorCdarPage implements OnInit {

  all : boolean;
  today : boolean;
  segment : string;

  todayCdar : Observable<any>;
  allCdar : Observable<any>;
  emptyTodayCdar : boolean;
  emptyAllCdar : boolean;

  instructor : string;
  searchTerm : string = '';
  debouncer : any;
  loader : boolean;

  date : any;
  
  constructor(private apiService : ApiService,
              private storageService : StorageService,
              private alertController : AlertController,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.today = true;
    this.all = false;
    this.segment = 'today'
    this.date = format(new Date(new Date()), "MMMM dd yyyy");
    setTimeout(() => {
      this.storageService.getObject('instructor').then((result) => {
        this.instructor = result;
        this.getCdar();
      })
    }, 2000)
  }

  getCdar(){
    this.todayCdar = this.apiService.getInstructorTodayCdar(this.instructor['id']);
    this.todayCdar.subscribe((val) => {
      if(val == ''){
        this.emptyTodayCdar = true;
      }else{
        this.emptyTodayCdar = false;
      }
    });
    this.allCdar = this.apiService.getInstructorAllCdar(this.instructor['id']);
    this.allCdar.subscribe((val) => {
      if(val == ''){
        this.emptyAllCdar = true;
      }else{
        this.emptyAllCdar = false;
      }
    });
    this.loader = false;
  }

  activateToday(){
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.today = true;
      this.all = false;
      this.loader = false;
    }, 1000);
  }

  activateAll(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.today = false;
      this.all = true;
      this.loader = false;
    }, 1000);
  }

  searchChanged(){
    this.todayCdar = this.apiService.searchTodayCdar(this.searchTerm, this.instructor['id']);
    this.allCdar = this.apiService.searchAllCdar(this.searchTerm, this.instructor['id']);
  }

  approveCdar(item){
    console.log(item);
    this.loader = true;
    setTimeout(() => {
      let cdarData = {
        'instructor_signature' : true,
        'pending_for_approval' : false,
      }
      if(item['from_treatment_record']){
        let treatmentRecordData = {
          'instructor_signature' : true,
          'pending_for_approval' : false,
        }
        this.apiService.updateTreatmentRecord(treatmentRecordData, item['treatment_record']).then((res) => {
          this.apiService.updateCDAR(cdarData, item['id']).then((res) => {
            this.successMessage();
          })
          .catch(error => {
            console.log(error);
            this.errorMessage();
          })
        })
        .catch(error => {
          console.log(error);
        })
      }else{
        this.apiService.updateCDAR(cdarData, item['id']).then((res) => {
          this.successMessage();
        })
        .catch(error => {
          console.log(error);
          this.errorMessage();
        })
      }
    }, 2000)
  }
  
  async showApproveCdarMessage(item){
    console.log(item);
    const alert = await this.alertController.create({
      header: 'CDAR',
      message: 'Do you want to approve this record? Please note this cannot be undone.',
      cssClass: 'confirmation',
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
            this.approveCdar(item);
          }
        }
      ]
    });
    await alert.present();
  }
  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Great',
      message: 'Clinician daily achievement record has been approved.',
      cssClass: 'success-message',
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
      cssClass: 'error-message',
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

  /* Utility function for refreshing the current page. */
  doRefresh(event){
    setTimeout(() => {
      this.getCdar();
      event.target.complete();
    }, 2000);
  }
}