import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from './../../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from "date-fns";

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.page.html',
  styleUrls: ['./patient-profile.page.scss'],
})
export class PatientProfilePage implements OnInit {

  patientDetails : any;
  debouncer : any;
  loader : any;
  isReadOnly : boolean;
  currentPatient : any;

  patientUpdateForm : FormGroup;
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
    'title' : [
      { type : 'required', message : 'Title/Honorific is required.' }
    ],
    'gender' : [
      { type : 'required', message : 'Gender is required.' }
    ],
    'birthdate' : [
      { type : 'required', message : 'Birthdate is required.' }
    ],
    'marital_status' : [
      { type : 'required', message : 'Marital Status is required.' }
    ],
    'occupation' : [
      { type : 'required', message : 'Occupation is required' }
    ],
    'number_of_kids' : [
      { type : 'required', message : 'Number of kids is required but put 0 if none' }
    ],
    'height' : [
      { type : 'required', message : 'Height is required' },
      { type : 'pattern', message : "Height must be in feet and inches format e.g (5'2'')." },
    ],
    'weight' : [
      { type : 'required', message : 'Weight is required' }
    ],
    'permanent_address' : [
      { type : 'required', message : 'Permanent address is required' }
    ],
    'phone_num' : [
      { type : 'minlength', message : 'Phone number must be exactly 11 numbers long' },
      { type : 'maxlength', message : 'Phone number must be exactly 11 numbers long' },
      { type : 'pattern', message : 'Invalid phone number' }
    ],
    'telephone_num' : [
      { type : 'minlength', message : 'Telephone number must be exactly 8 numbers long' },
      { type : 'maxlength', message : 'Telephone number must be exactly 8 numbers long' },
      { type : 'pattern', message : 'Invalid telephone number' }
    ],
    'email_address' : [
      { type : 'pattern', message : 'Invalid email address' }
    ],
    'emergency_first_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],
    'emergency_middle_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],
    'emergency_last_name' : [
      { type : 'required', message : 'First Name is required.' },
      { type : 'pattern', message : 'First Name must contain only letters.' },
    ],
    'emergency_address' : [
      { type : 'required', message : 'Emergency contact person address is required.' }
    ],
    'emergency_telephone_num' : [
      { type : 'minlength', message : 'Telephone number must be exactly 8 numbers long' },
      { type : 'maxlength', message : 'Telephone number must be exactly 8 numbers long' },
      { type : 'pattern', message : 'Invalid telephone number' }
    ],
    'emergency_phone_num' : [
      { type : 'minlength', message : 'Phone number must be exactly 11 numbers long' },
      { type : 'maxlength', message : 'Phone number must be exactly 11 numbers long' },
      { type : 'pattern', message : 'Invalid phone number' }
    ],
  }

  constructor(private apiService : ApiService,
              private alertController : AlertController,
              private storageService : StorageService,
              private formBuilder : FormBuilder,
              ) { 
    this.patientUpdateForm = formBuilder.group({
      title : ['', Validators.required],
      first_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      middle_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      gender : ['', Validators.required],
      birthdate : ['', Validators.required],
      religion : [''],
      marital_status : ['', Validators.required],
      occupation : ['', Validators.required],
      number_of_kids : ['', Validators.required],
      height : ['', Validators.compose([Validators.required, Validators.pattern("[1-9]['][0-9][0-9]?['][']")])],
      weight : ['', Validators.required],
      permanent_address : ['', Validators.required],
      telephone_num : ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')])],
      phone_num : ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0][9][0-9]*')])],
      email_address : ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      emergency_first_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      emergency_middle_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      emergency_last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      relation_to_patient : ['', Validators.required],
      emergency_address : ['', Validators.required],
      emergency_telephone_num : ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')])],
      emergency_phone_num : ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0][9][0-9]*')])],
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.isReadOnly = true;
    this.submitAttempt = false;
    
    this.storageService.getObject('patient').then((result) => {
      this.currentPatient = result;

      this.debouncer = setTimeout(() => {
        this.apiService.getPatientDetails(this.currentPatient['id']).subscribe((val) => {
          this.patientDetails = val;
          this.loader = false;
        });
      }, 2000);
    })
  }

  updateProfile(){

    this.submitAttempt = true;

    let patientData = {
      "first_name" : this.patientUpdateForm.value.first_name,
      "title" : this.patientUpdateForm.value.title,
      "middle_name" : this.patientUpdateForm.value.middle_name,
      "last_name" : this.patientUpdateForm.value.last_name,
      "gender" : this.patientUpdateForm.value.gender,
      // "birthdate" : this.register_form.value.birthdate.split('T')[0],
      "birthdate" : format(new Date(this.patientUpdateForm.value.birthdate), "yyyy-MM-dd"),
      "religion" : this.patientUpdateForm.value.religion,
      "marital_status" : this.patientUpdateForm.value.marital_status,
      "occupation" : this.patientUpdateForm.value.occupation,
      "number_of_kids" : this.patientUpdateForm.value.number_of_kids,
      "height" : this.patientUpdateForm.value.height,
      "weight" : this.patientUpdateForm.value.weight,
      "permanent_address" : this.patientUpdateForm.value.permanent_address,
      "telephone_num" : this.patientUpdateForm.value.telephone_num,
      "phone_num" : this.patientUpdateForm.value.phone_num,
      "email_address" : this.patientUpdateForm.value.email_address,
      "emergency_first_name" : this.patientUpdateForm.value.emergency_first_name,
      "emergency_middle_name" : this.patientUpdateForm.value.emergency_middle_name,
      "emergency_last_name" : this.patientUpdateForm.value.emergency_last_name,
      "relation_to_patient" : this.patientUpdateForm.value.relation_to_patient,
      "emergency_address" : this.patientUpdateForm.value.emergency_address,
      "emergency_telephone_num" : this.patientUpdateForm.value.emergency_telephone_num,
      "emergency_phone_num" : this.patientUpdateForm.value.emergency_phone_num,
    }


    if(!this.patientUpdateForm.valid){
      console.log('Invalid form');
    }else{
      console.log(patientData);
      this.loader = true;

      this.debouncer = setTimeout(() => {
        this.apiService.updatePatient(this.currentPatient['id'], patientData).then((res) => {
          this.successMessage();
        })
        .catch(error => {
          this.errorMessage();
          console.log(error);
        });
      }, 2000)
    }
  }

  editProfile(){
    this.isReadOnly = false;
  }

  cancelEdit(){
    this.isReadOnly = true;
    this.ionViewWillEnter();
    this.patientUpdateForm.reset();
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Awesome!',
      message: 'Your profile has been successfully updated.',
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