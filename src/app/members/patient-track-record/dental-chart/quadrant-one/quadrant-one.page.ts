import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quadrant-one',
  templateUrl: './quadrant-one.page.html',
  styleUrls: ['./quadrant-one.page.scss'],
})
export class QuadrantOnePage implements OnInit {

  trackRecord : any;
  dentalCharts : Observable<any>;
  loader : boolean;
  debouncer : any;
  isEmpty : boolean;

  constructor(private apiService : ApiService,
              private activatedRoute : ActivatedRoute,
              private router : Router,) { 
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
    this.debouncer = setTimeout(() => {
      this.dentalCharts = this.apiService.getDentalChartQ1(this.trackRecord[0]['id']);
      this.dentalCharts.subscribe(val => {
        console.log(val);
        if(val == ''){
          this.isEmpty = true;
        }else{
          this.isEmpty = false;
        }
      });
      this.loader = false;
    }, 2000);
  }
}
