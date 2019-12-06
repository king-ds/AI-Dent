import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {

  clinician : string;
  information = null;
  loader : boolean = false;
  debouncer : any;
  add_patient : boolean;
  add_complaint : boolean;
  add_medical_history : boolean;
  add_medical_history_questionnaire : boolean;
  add_track_record : boolean;
  add_allergies : boolean;
  complaint_id : string;
  medical_history_id : string;
  medical_history_questionnaire_id : string;
  track_record_id : string;
  allergies_id : string;


  constructor(private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private storageService : StorageService,
              private router : Router,
              private alertController : AlertController) { }

  ngOnInit() {
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.getCurrentClinician();
      this.getPatientDetails();
      this.loader = false;
    }, 2000)
  }

  addPatient(){

    this.loader = true;
    
    let patient_id = this.information['id'];

    let additionalPersonalData = {
      'chief_complaint' : '',
      'history_of_present_illness' : '',
    }

    let medicalHistory = {
        'physician_care': false,
        'hospitalization': '',
        'allergies': '',
        'illnesses': '',
        'medications': '',
        'childhood_disease_history': '',
  
    }

    let medicalHistoryQuestionnaire = {
      "others": "",
      "high_blood_pressure": false,
      "diabetes": false,
      "osteoporosis": false,
      "herpes": false,
      "radiation_treatments": false,
      "chemotherapy": false,
      "artificial_heart_valves": false,
      "heart_attack": false,
      "pacemaker": false,
      "angioplasty": false,
      "stroke": false,
      "angina_pectrosis": false,
      "frequent_high_fever": false,
      "sinusitis": false,
      "empyema": false,
      "asthma": false,
      "breathing_problems": false,
      "afternoon_fever": false,
      "chronic_cough": false,
      "bloody_sputum": false,
      "tuberculosis": false,
      "frequent_heartaches": false,
      "visual_impairment": false,
      "hearing_impairment": false,
      "athritis": false,
      "pain_in_joints": false,
      "tumors": false,
      "swollen_ankles": false,
      "goiter": false,
      "frequent_thirst": false,
      "frequent_hunger": false,
      "frequent_urination": false,
      "sudden_weight_loss": false,
      "abdominal_discomfort": false,
      "acidic_reflux": false,
      "bleeding_bruining_easily": false,
      "recreational_drugs": false,
      "steroid_therapy": false,
      "blood": false,
      "pain_upon_urination": false,
      "kidney_liver_problems": false,
      "hepatitis": false,
      "sexually_transmitted_disease": false,
      "hiv_positive": false,
      "fainting_spells": false,
      "depression": false
    }

    let allergies = {
      "others": "",
      "aspirin": false,
      "penicillin": false,
      "latex": false,
      "metal": false,
      "none": false
    }

    // Add empty complaint data
    this.apiService.addComplaint(additionalPersonalData).then(res => {
      this.complaint_id = res['id']
      this.add_complaint = true;
    })
    .catch(error => {
      console.log(error);
      this.add_complaint = false;
    });

    // Add empty medical history
    this.apiService.addMedicalHistory(medicalHistory).then(res => {
      this.medical_history_id = res['id']
      this.add_medical_history = true;
    })
    .catch(error => {
      console.log(error);
      this.add_medical_history = false;
    });

    // Add empty medical history questionnaire
    this.apiService.addMedicalHistoryQuestionnaire(medicalHistoryQuestionnaire).then(res => {
      this.medical_history_questionnaire_id = res['id']
      this.add_medical_history_questionnaire = true;
    })
    .catch(error => {
      console.log(error);
      this.add_medical_history_questionnaire = false;
    });

    // Add empty allergies
    this.apiService.addAllergies(allergies).then(res => {
      this.allergies_id = res['id']
      this.add_allergies = true;
    })
    .catch(error => {
      console.log(error);
      this.add_allergies = false;
    });

    // Set delay when adding track record
    this.debouncer = setTimeout(() => {
      
      let trackRecord = {
        "is_approved": false,
        "additional_personal_data": this.complaint_id,
        "medical_history": this.medical_history_id,
        "medical_health_questionnaire": this.medical_history_questionnaire_id,
        "allergies": this.allergies_id
      }

      this.addTrackRecord(trackRecord);
    }, 2000)

    this.debouncer = setTimeout(() =>{
      if (this.add_complaint != true){
        console.log('Add Complaint Failed');
        this.errorMessage();
      } else if (this.add_medical_history != true){
        console.log('Add Medical History Failed');
        this.errorMessage();
      } else if (this.add_medical_history_questionnaire != true){
        console.log('Add Medical History Questionnaire Failed');
        this.errorMessage();
      } else {

        let assignedData = {
          'assigned_to' : this.clinician,
          'has_doctor' : true,
          'track_record' : this.track_record_id,
        }

        // Update patient status
        this.apiService.addPatient(patient_id, assignedData).then(res => {
          console.log(res);
          this.add_patient = true;
          this.successMessage();
        })
        .catch(error => {
          console.log(error);
          this.add_patient = false;
          this.errorMessage();
        });
        
      }
      this.loader = false;
    }, 4000);
  }

  addTrackRecord(data){
    this.apiService.addTrackRecord(data).then(res => {
      this.track_record_id = res['id']
      this.add_track_record = true;
    })
    .catch(error => {
      console.log(error);
      this.add_track_record = false;
    });
  }

  updatePatient(patient_id, assignedData){
    this.apiService.addPatient(patient_id, assignedData).then(res => {
      console.log(res);
      this.add_patient = true;
      this.successMessage();
    })
    .catch(error => {
      console.log(error);
      this.add_patient = false;
      this.errorMessage();
    });
  }

  getPatientDetails(){
    let patient_id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(patient_id);

    this.apiService.getPatientDetails(patient_id).subscribe(result => {
      this.information = result;
    });
  }

  getCurrentClinician(){
    this.storageService.getObject('clinician').then((result) => {
      this.clinician = result['id'];
    });
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: this.information['first_name']+' '+this.information['last_name']+' added to your patient',
      buttons: [{
        text:'Ok',
        handler: () => {
          this.router.navigate(['members', 'menu', 'clinician-dashboard']);
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
          this.router.navigate(['members', 'menu', 'clinician-dashboard']);
        }
      }],
    });
    await alert.present();
  }

  async confirmationMessage(){

    const alert = await this.alertController.create({
      header: 'Add Patient',
      message: 'Do you want to add this patient?',
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
            this.addPatient();
          }
        }
      ]
    });
    await alert.present();
  }

  topButton(){
    console.log('shit');
  }
}