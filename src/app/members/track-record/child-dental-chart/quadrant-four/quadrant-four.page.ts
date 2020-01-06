import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quadrant-four',
  templateUrl: './quadrant-four.page.html',
  styleUrls: ['./quadrant-four.page.scss'],
})
export class QuadrantFourPage implements OnInit {

  trackRecord : any;
  dentalCharts : Observable<any>;
  loader : boolean;
  debouncer : any;

  editMode : boolean = false;
  editData : any;

  CDRS : any[] = [];

  APC : boolean;
  Ab : boolean;
  Am : boolean;
  C : boolean;
  CD : boolean;
  CF : boolean;
  Co : boolean;
  F : boolean;
  GC : boolean;
  GI : boolean;
  Imp : boolean;
  In : boolean;
  M : boolean;
  MC : boolean;
  P : boolean;
  PFG : boolean;
  PFM : boolean;
  PFS : boolean;
  RC : boolean;
  RPD : boolean;
  SS : boolean;
  Un : boolean;
  X : boolean;
  top : string;
  bottom : string;
  middle : string;
  left : string;
  right : string;
  id : any;
  kind : string;
  trackRecordId : any;
  teethNumber : any;

  constructor(private apiService : ApiService,
              private activatedRoute : ActivatedRoute,
              private router : Router,
              private alertController : AlertController,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.trackRecord = this.router.getCurrentNavigation().extras.state.track_record;
      }
    }); 
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    let teethNumber = [81, 82, 83, 84, 85]

    // Check for the existing teeth number
    this.apiService.getDentalChartQ4(this.trackRecord['id']).subscribe((val : any) => {
      var arrayObject = Array.from(val);
      for(var i = 0; i < arrayObject.length; i++){
        var arrayTeethNumber = val[i]["teeth_number"]
        if(teethNumber.includes(arrayTeethNumber)){
          console.log(arrayTeethNumber);
          var index = teethNumber.indexOf(arrayTeethNumber);
          if (index > -1) {
            teethNumber.splice(index, 1);
          }
        }
      }
    console.log(teethNumber)

    for(var i = 0; i < teethNumber.length; i++){
      let dentalChartData = {
        "teeth_number" : teethNumber[i],
        "kind" : "Pediatric",
        "track_record" : this.trackRecord['id'],
        "quadrant" : 4,
      }
      
      this.debouncer = setTimeout(() => {
        this.apiService.addDentalChart(dentalChartData).then(() => {
        })
        .catch(error => {
          this.loader = false;
          this.errorMessage();
        });
      }, 2000)
    }

    this.debouncer = setTimeout(() => {
      this.dentalCharts = this.apiService.getDentalChartQ4(this.trackRecord['id']);
      this.loader = false;
      }, 4000);
    })
  }

  editTeethNumber(teethNumber){
    this.editMode = true;
    this.editData = teethNumber;

    console.log(this.editData);

    this.APC = teethNumber['APC']
    this.Ab = teethNumber['Ab']
    this.Am = teethNumber['Am']
    this.C = teethNumber['C']
    this.CD = teethNumber['CD']
    this.CF = teethNumber['CF']
    this.Co = teethNumber['Co']
    this.F = teethNumber['F']
    this.GC = teethNumber['GC']
    this.GI = teethNumber['GI']
    this.Imp = teethNumber['Imp']
    this.In = teethNumber['In']
    this.M = teethNumber['M']
    this.MC = teethNumber['MC']
    this.P = teethNumber['P']
    this.PFG = teethNumber['PFG']
    this.PFM = teethNumber['PFM']
    this.PFS = teethNumber['PFS']
    this.RC = teethNumber['RC']
    this.RPD = teethNumber['RPD']
    this.SS = teethNumber['SS']
    this.Un = teethNumber['Un']
    this.X = teethNumber['X']
    this.top = teethNumber['top']
    this.bottom = teethNumber['bottom']
    this.middle = teethNumber['middle']
    this.left = teethNumber['left']
    this.right = teethNumber['right']
    this.id = teethNumber['id']
    this.kind = teethNumber['kind']
    this.trackRecordId = teethNumber['track_record']
    this.teethNumber = teethNumber['teeth_number']

    this.CDRS = [
      {
        id : 1,
        name : "APC",
        value : this.APC
      },
      {
        id : 2,
        name : "Ab",
        value : this.Ab
      },
      {
        id : 3,
        name : "Am",
        value : this.Am
      },
      {
        id : 4,
        name : "C",
        value : this.C
      },
      {
        id : 5,
        name : "CD",
        value : this.CD
      },
      {
        id : 6, 
        name : "CF",
        value : this.CF
      },
      {
        id : 7,
        name : "Co",
        value : this.Co
      },
      {
        id : 8,
        name : "F",
        value : this.F
      },
      {
        id : 9,
        name : "GC",
        value : this.GC
      },
      {
        id : 10,
        name : "GI",
        value : this.GI
      },
      {
        id : 11,
        name : "Imp",
        value : this.GI
      },
      {
        id : 12,
        name : "In",
        value : this.In
      },
      {
        id : 13,
        name : "M",
        value : this.M
      },
      {
        id : 14,
        name : "MC",
        value : this.MC
      },
      {
        id : 15,
        name : "P",
        value : this.P
      },
      {
        id : 16,
        name : "PFG",
        value : this.PFG
      },
      {
        id : 17,
        name : "PFM",
        value : this.PFM
      },
      {
        id : 18,
        name : "PFS",
        value : this.PFS
      },
      {
        id : 19,
        name : "RC",
        value : this.RC
      },
      {
        id : 20,
        name : "RPD",
        value : this.RPD
      },
      {
        id : 21,
        name : "SS",
        value : this.SS
      },
      {
        id : 22,
        name : "Un",
        value : this.Un
      },
      {
        id : 23,
        name : "X",
        value : this.X
      },
    ]
  }

  OnChange(event){
    var selectedData = event.target.value;
    if(selectedData.includes(1)){
      this.APC = true;
    }else{
      this.APC = false;
    }
    if(selectedData.includes(2)){
      this.Ab = true;
    }else{
      this.Ab = false;
    }
    if(selectedData.includes(3)){
      this.Am = true;
    }else{
      this.Am = false;
    }
    if(selectedData.includes(4)){
      this.C = true;
    }else{
      this.C = false;
    }
    if(selectedData.includes(5)){
      this.CD = true;
    }else{
      this.CD = false;
    }
    if(selectedData.includes(6)){
      this.CF = true;
    }else{
      this.CF = false;
    }
    if(selectedData.includes(7)){
      this.Co = true;
    }else{
      this.Co = false;
    }
    if(selectedData.includes(8)){
      this.F = true;
    }else{
      this.F = false;
    }
    if(selectedData.includes(9)){
      this.GC = true;
    }else{
      this.GC = false;
    }
    if(selectedData.includes(10)){
      this.GI = true;
    }else{
      this.GI = false;
    }
    if(selectedData.includes(11)){
      this.Imp = true;
    }else{
      this.Imp = false;
    }
    if(selectedData.includes(12)){
      this.In = true;
    }else{
      this.In = false;
    }
    if(selectedData.includes(13)){
      this.M = true;
    }else{
      this.M = false;
    }
    if(selectedData.includes(14)){
      this.MC = true;
    }else{
      this.MC = false;
    }
    if(selectedData.includes(15)){
      this.P = true;
    }else{
      this.P = false;
    }
    if(selectedData.includes(16)){
      this.PFG = true;
    }else{
      this.PFG = false;
    }
    if(selectedData.includes(17)){
      this.PFM = true;
    }else{
      this.PFM = false;
    }
    if(selectedData.includes(18)){
      this.PFS = true;
    }else{
      this.PFS = false;
    }
    if(selectedData.includes(19)){
      this.RC = true;
    }else{
      this.RC = false;
    }
    if(selectedData.includes(20)){
      this.RPD = true;
    }else{
      this.RPD = false;
    }
    if(selectedData.includes(21)){
      this.SS = true;
    }else{
      this.SS = false;
    }
    if(selectedData.includes(22)){
      this.Un = true;
    }else{
      this.Un = false;
    }
    if(selectedData.includes(23)){
      this.X = true;
    }else{
      this.X = false;
    }
  }

  submitEditedTeethNumber(){
    this.loader = true;
    let dentalChart = {
      "teeth_number": this.editData['teeth_number'],
      "left": this.left,
      "right": this.right,
      "bottom": this.bottom,
      "top": this.top,
      "CF": this.CF,
      "Ab": this.Ab,
      "Am": this.Am,
      "APC": this.APC,
      "C": this.C,
      "Co": this.Co,
      "CD": this.CD,
      "GC": this.GC,
      "GI": this.GI,
      "Imp": this.Imp,
      "In": this.In,
      "M": this.M,
      "MC": this.MC,
      "P": this.P,
      "PFG": this.PFG,
      "F": this.F,
      "PFM": this.PFM,
      "PFS": this.PFS,
      "RC": this.RC,
      "RPD": this.RPD,
      "SS": this.SS,
      "Un": this.Un,
      "X": this.X,
      "middle": this.middle,
      "track_record": this.trackRecordId,
    }
    this.debouncer = setTimeout(()=> {
      this.apiService.updateDentalChart(dentalChart, this.id).then((res) => {
        this.loader = false;
        this.successMessage();
        this.ionViewWillEnter();
        this.editMode = false;
        console.log(res);
      })
      .catch(error => {
        this.loader = false;
        this.errorMessage();
        console.log(error);
      });
    }, 2000)
  }

  cancelEditTeethNumber(){
    this.editMode = false
    this.editData = '';
  }

  topButton(){
    this.selectionRadioButton('top');
  }

  leftButton(){
    this.selectionRadioButton('left');
  }

  middleButton(){
    this.selectionRadioButton('middle');
  }

  rightButton(){
    this.selectionRadioButton('right');
  }

  bottomButton(){
    this.selectionRadioButton('bottom');
  }

  async selectionRadioButton(position){
    const alert = await this.alertController.create({
      header : "",
      message : "",
      inputs : [
        {
          name : 'red',
          type : 'radio',
          label : 'Red',
          value : 'r',
        },
        {
          name : 'blue',
          type : 'radio',
          label : 'Blue',
          value : 'b'
        },
        {
          name : 'green',
          type : 'radio',
          label : 'Green',
          value : 'g',
        },
        {
          name : 'white',
          type : 'radio',
          label : 'White',
          value : 'w'
        }
      ],
      buttons : [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel')
          }
        },
        {
          text: 'Okay',
          handler: (data:string) => {

            // TOP
            if(data == 'r' && position == 'top'){
              this.top = data;
              console.log(this.top + position);
            }else if(data == 'b' && position == 'top'){
              this.top = data;
              console.log(this.top + position);
            }else if(data == 'g' && position == 'top'){
              this.top = data;
              console.log(this.top + position);
            }else if(data =='w' && position == 'top'){
              this.top = '';
              console.log(this.top + position);

            // LEFT
            }else if(data =='r' && position == 'left'){
              this.left = data;
              console.log(this.left + position);
            }else if(data == 'b' && position == 'left'){
              this.left = data;
              console.log(this.left + position);
            }else if(data == 'g' && position == 'left'){
              this.left = data;
              console.log(this.left + position);
            }else if(data == 'w' && position == 'left'){
              this.left = '';
              console.log(this.left + position);

            // RIGHT
            }else if(data =='r' && position == 'right'){
              this.right = data;
              console.log(this.right + position);
            }else if(data == 'b' && position == 'right'){
              this.right = data;
              console.log(this.right + position);
            }else if(data == 'g' && position == 'right'){
              this.right = data;
              console.log(this.right + position);
            }else if(data == 'w' && position == 'right'){
              this.right = '';
              console.log(this.right + position);
            }

            // MIDDLE
            else if(data =='r' && position == 'middle'){
              this.middle = data;
              console.log(this.middle + position);
            }else if(data == 'b' && position == 'middle'){
              this.middle = data;
              console.log(this.middle + position);
            }else if(data == 'g' && position == 'middle'){
              this.middle = data;
              console.log(this.middle + position);
            }else if(data == 'w' && position == 'middle'){
              this.middle = '';
              console.log(this.middle + position);
            }

            // BOTTOM
            else if(data =='r' && position == 'bottom'){
              this.bottom = data;
              console.log(this.bottom + position);
            }else if(data == 'b' && position == 'bottom'){
              this.bottom = data;
              console.log(this.bottom + position);
            }else if(data == 'g' && position == 'bottom'){
              this.bottom = data;
              console.log(this.bottom + position);
            }else if(data == 'w' && position == 'bottom'){
              this.bottom = '';
              console.log(this.bottom + position);
            }            
          }
        }
      ]
    });
    await alert.present();
  }

  async successMessage() {
    const alert = await this.alertController.create({
      header: 'Dental Chart',
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
}