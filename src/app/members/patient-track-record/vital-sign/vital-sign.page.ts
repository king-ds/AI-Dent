import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-vital-sign',
  templateUrl: './vital-sign.page.html',
  styleUrls: ['./vital-sign.page.scss'],
})
export class VitalSignPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isEmpty : boolean;

  vitalSign : Observable<any>;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.vitalSign = this.apiService.getVitalSign(this.track_record['id']);
      this.vitalSign.subscribe(val => {
        console.log(val);
        if(val == ''){
          this.isEmpty = true;
        }else{
          this.isEmpty = false;
        }
      })
      this.loader = false;
    }, 2000)
  }
}
