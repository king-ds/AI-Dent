import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from './../../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clinician-profile',
  templateUrl: './clinician-profile.page.html',
  styleUrls: ['./clinician-profile.page.scss'],
})
export class ClinicianProfilePage implements OnInit {

  clinicianDetails : any;
  debouncer : any;
  loader : any;
  isReadOnly : boolean;
  currentClinician : any;

  clinicianUpdateForm : FormGroup
  submitAttempt : boolean = false;

  validation_messages = {

    'first_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],

    'middle_name' : [
      { type : 'required', message : 'Middle Name is required.' },
      { type : 'pattern', message : 'Middle Name must contain only letters.' },
    ],

    'last_name' : [
      { type : 'required', message : 'Last Name is required' },
      { type : 'pattern', message : 'Last Name must contain only letters.' },
    ],
  }

  constructor(private apiService : ApiService,
              private alertController : AlertController,
              private storageService : StorageService,
              private formBuilder : FormBuilder,) { 
    this.clinicianUpdateForm = formBuilder.group({
      clinic_level : ['', Validators.required],
      first_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      middle_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.isReadOnly = true;
    
    this.storageService.getObject('clinician').then((result) => {
      this.currentClinician = result;

      this.debouncer = setTimeout(() => {
        this.apiService.getClinicianDetails(this.currentClinician['id']).subscribe((val) => {
          this.clinicianDetails = val;
          this.loader = false;
        })
      }, 2000);
    })
  }

  updateProfile(){
    this.submitAttempt = true;

    let clinicianData = {
      "clinic_level" : this.clinicianUpdateForm.value.clinic_level,
      "first_name" : this.clinicianUpdateForm.value.first_name,
      "middle_name" : this.clinicianUpdateForm.value.middle_name,
      "last_name" : this.clinicianUpdateForm.value.last_name,
    }

    if(!this.clinicianUpdateForm.valid){
      console.log('Invalid form')
    }else{
      this.loader = true;
      
      this.debouncer = setTimeout(() => {
        this.apiService.updateClinician(this.currentClinician['id'], clinicianData).then((res) => {
          this.successMessage();
        })
        .catch(error => {
          this.errorMessage();
          console.log(error);
        })
      }, 2000)
    }
  }

  editProfile(){
    this.isReadOnly = false;
  }

  cancelEdit(){
    this.isReadOnly = true;
    this.ionViewWillEnter();
    this.clinicianUpdateForm.reset();
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Awesome!',
      message: 'Your profile has been successfully updated.',
      backdropDismiss: false,
      buttons: [{
        text:'Ok',
        handler: () => {
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

  async confirmationMessage(){

    const alert = await this.alertController.create({
      header: 'Profile',
      message: 'Do you want to save this update?',
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
            this.updateProfile()
          }
        }
      ]
    });
    await alert.present();
  }
}