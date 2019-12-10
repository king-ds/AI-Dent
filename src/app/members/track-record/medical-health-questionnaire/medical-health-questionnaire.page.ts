import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-medical-health-questionnaire',
  templateUrl: './medical-health-questionnaire.page.html',
  styleUrls: ['./medical-health-questionnaire.page.scss'],
})
export class MedicalHealthQuestionnairePage implements OnInit {

  patient : any;
  debouncer : any;
  loader : boolean;
  isReadOnly = true;

  highBloodPressure : boolean;
  diabetes : boolean;
  osteoporosis : boolean;
  herpes : boolean;
  radiationTreatments : boolean;
  chemotherapy : boolean;
  artificialHeartValves : boolean;
  heartAttack : boolean;
  pacemaker : boolean;
  angioplasty : boolean;
  stroke : boolean;
  anginaPectrosis : boolean;
  freqeuntHighFever : boolean;
  sinusitis : boolean;
  empyema : boolean;
  asthma : boolean;
  breathingProblems : boolean;
  afternoonFever : boolean;
  chronicCough : boolean;
  bloodySputum : boolean;
  tuberculosis : boolean;
  frequentHeartAches : boolean;
  visualImpairment : boolean;
  hearingImpairment : boolean;
  athritis : boolean;
  painInJoints : boolean;
  tumors : boolean;
  swollenAnkles : boolean;
  goiter : boolean;
  frequentThirst : boolean;
  frequentHunger : boolean;
  frequentUrination : boolean;
  suddenWeightLoss : boolean;
  abdominalDiscomfort : boolean;
  acidicReflux : boolean;
  bleedingBruiningEasily : boolean;
  recreationalDrugs : boolean;
  steroidTherapy : boolean;
  blood : boolean;
  painUponUrination : boolean;
  kindeyLiverProblems : boolean;
  hepatitis : boolean;
  sexuallyTransmittedDisease : boolean;
  hivPositive : boolean;
  faintingSpells : boolean;
  depression : boolean;
  others : string;

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
      this.apiService.getMedicalHealthQuestionnaire(this.patient['track_record']).subscribe((val) => {
        this.highBloodPressure = val['high_blood_pressure']
        this.diabetes = val['diabetes']
        this.osteoporosis = val['osteoporosis']
        this.herpes = val['herpes']
        this.radiationTreatments = val['radiation_treatments']
        this.chemotherapy = val['chemotherapy']
        this.artificialHeartValves = val['artificial_heart_valves']
        console.log(val['heart_attack'])
        this.heartAttack = val['heart_attack']
        this.pacemaker = val['pacemaker']
        this.angioplasty = val['angioplasty']
        this.stroke = val['stroke']
        this.anginaPectrosis = val['angina_pectrosis']
        this.freqeuntHighFever = val['frequent_high_fever']
        this.sinusitis = val['sinusitis']
        this.empyema = val['empyema']
        this.asthma = val['asthma']
        this.breathingProblems = val['breathing_problems']
        this.afternoonFever = val['afternoon_fever']
        this.chronicCough = val['chronic_cough']
        this.bloodySputum = val['bloody_sputum']
        this.tuberculosis = val['tuberculosis']
        this.frequentHeartAches = val['frequent_heartaches']
        this.visualImpairment = val['visual_impairment']
        this.hearingImpairment = val['hearing_impairment']
        this.athritis = val['athritis']
        this.painInJoints = val['pain_in_joints']
        this.tumors = val['tumors']
        this.swollenAnkles = val['swollen_ankles']
        this.goiter = val['goiter']
        this.frequentThirst = val['frequent_thirst']
        this.frequentHunger = val['frequent_hunger']
        this.frequentUrination = val['frequent_urination']
        this.suddenWeightLoss = val['sudden_weight_loss']
        this.abdominalDiscomfort = val['abdominal_discomfort']
        this.acidicReflux = val['acidic_reflux']
        this.bleedingBruiningEasily = val['bleeding_bruining_easily']
        this.recreationalDrugs = val['recreational_drugs']
        this.steroidTherapy = val['steroid_therapy']
        this.blood = val['blood']
        this.painUponUrination = val['pain_upon_urination']
        this.kindeyLiverProblems = val['kidney_liver_problems']
        this.hepatitis = val['hepatitis']
        this.sexuallyTransmittedDisease = val['sexually_transmitted_disease']
        this.hivPositive = val['hiv_positive']
        this.faintingSpells = val['fainting_spells']
        this.depression = val['depression']
        this.others = val['others']
        this.loader = false;
      })
    }, 2000)
  }

  editMedicalHealthQuestionnaire(){
    this.isReadOnly = false;
  }

  submitEditedMedicalHealthQuestionnaire(){
    this.loader = true;
    this.isReadOnly = true;

    let medicalHealthQuestionnaireData = {
      "medical_health_questionnaire": {
        "others": this.others,
        "high_blood_pressure": this.highBloodPressure,
        "diabetes": this.diabetes,
        "osteoporosis": this.osteoporosis,
        "herpes": this.herpes,
        "radiation_treatments": this.radiationTreatments,
        "chemotherapy": this.chemotherapy,
        "artificial_heart_valves": this.artificialHeartValves,
        "heart_attack": this.heartAttack,
        "pacemaker": this.pacemaker,
        "angioplasty": this.angioplasty,
        "stroke": this.stroke,
        "angina_pectrosis": this.anginaPectrosis,
        "frequent_high_fever": this.freqeuntHighFever,
        "sinusitis": this.sinusitis,
        "empyema": this.empyema,
        "asthma": this.asthma,
        "breathing_problems": this.breathingProblems,
        "afternoon_fever": this.afternoonFever,
        "chronic_cough": this.chronicCough,
        "bloody_sputum": this.bloodySputum,
        "tuberculosis": this.tuberculosis,
        "frequent_heartaches": this.frequentHeartAches,
        "visual_impairment": this.visualImpairment,
        "hearing_impairment": this.hearingImpairment,
        "athritis": this.athritis,
        "pain_in_joints": this.painInJoints,
        "tumors": this.tumors,
        "swollen_ankles": this.swollenAnkles,
        "goiter": this.goiter,
        "frequent_thirst": this.frequentThirst,
        "frequent_hunger": this.frequentHunger,
        "frequent_urination": this.frequentUrination,
        "sudden_weight_loss": this.suddenWeightLoss,
        "abdominal_discomfort": this.abdominalDiscomfort,
        "acidic_reflux": this.acidicReflux,
        "bleeding_bruining_easily": this.bleedingBruiningEasily,
        "recreational_drugs": this.recreationalDrugs,
        "steroid_therapy": this.steroidTherapy,
        "blood": this.blood,
        "pain_upon_urination": this.painUponUrination,
        "kidney_liver_problems": this.kindeyLiverProblems,
        "hepatitis": this.hepatitis,
        "sexually_transmitted_disease": this.sexuallyTransmittedDisease,
        "hiv_positive": this.hivPositive,
        "fainting_spells": this.faintingSpells,
        "depression": this.depression,
      }
    }
    this.debouncer = setTimeout(() => {
      this.apiService.updateMedicalHealthQuestionnaire(medicalHealthQuestionnaireData, this.patient['track_record']).then(res => {
        this.loader = false;
        this.successMessage();
        this.ionViewWillEnter();
      })
      .catch(error => {
        this.loader = false;
        this.errorMessage();
        console.log(error);
      })
    })
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
      header: 'Medical Health Questionnaire',
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
            this.submitEditedMedicalHealthQuestionnaire()
          }
        }
      ]
    });
    await alert.present();
  }
}