import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vital-sign',
  templateUrl: './vital-sign.page.html',
  styleUrls: ['./vital-sign.page.scss'],
})
export class VitalSignPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  isReadOnly = true;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,
              private alertController : AlertController,) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log(this.track_record['id'])
  }

}
