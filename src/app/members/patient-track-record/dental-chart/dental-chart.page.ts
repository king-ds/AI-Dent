import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dental-chart',
  templateUrl: './dental-chart.page.html',
  styleUrls: ['./dental-chart.page.scss'],
})
export class DentalChartPage implements OnInit {

  track_record : any;
  dentalCharts : any;
  isMixed : boolean = false;
  isPedia : boolean = false;
  isAdult : boolean = false;
  isEmpty : boolean = false;
  kind : string;

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router,
              private apiService : ApiService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    try{
      this.dentalCharts = this.apiService.getDentalChartQ1(this.track_record['id']);
      this.dentalCharts.subscribe(val => {
        try{
          if(val[0]['kind'] == 'Mixed'){
            this.isEmpty = false;
            this.kind = 'Mixed';
            this.isMixed = true;
          }
          else if(val[0]['kind'] == 'Pediatric'){
            this.isEmpty = false;
            this.kind = 'Pediatric';
            this.isPedia = true;
          }else{
            this.isEmpty = false;
            this.kind = 'Adult';
            this.isAdult = true;
          }
        }catch{
          this.isEmpty = true;
        }
      });
    }catch{
      this.isEmpty = true;
    }
  }

  goToQuadrant1(){
    this.track_record['type'] = this.kind;
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };
    this.router.navigate(['members', 'patient-dental-chart', 'quadrant-one'], navigationExtras);
  }

  goToQuadrant2(){
    this.track_record['type'] = this.kind;
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'patient-dental-chart', 'quadrant-two'], navigationExtras);   
  }

  goToQuadrant3(){
    this.track_record['type'] = this.kind;
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'patient-dental-chart', 'quadrant-three'], navigationExtras);   
  }

  goToQuadrant4(){
    this.track_record['type'] = this.kind;
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'patient-dental-chart', 'quadrant-four'], navigationExtras);   
  }
}