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
    this.storageService.getObject('instructor').then((result) => {
      this.instructor = result;

      this.debouncer = setTimeout(() => {
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
      }, 2000)
    })
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
      }

      this.apiService.updateCDAR(cdarData, item['id']).then((res) => {
        this.successMessage();
      })
      .catch(error => {
        this.errorMessage();
        console.log(error);
      })
    }, 2000)
  }
  
  async showApproveCdarMessage(item){
    const alert = await this.alertController.create({
      header: 'CDAR',
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