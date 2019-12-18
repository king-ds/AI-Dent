import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dental-chart',
  templateUrl: './dental-chart.page.html',
  styleUrls: ['./dental-chart.page.scss'],
})
export class DentalChartPage implements OnInit {

  track_record : any;

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  goToQuadrant1(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'patient-dental-chart', 'quadrant-one'], navigationExtras);
  }

  goToQuadrant2(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'patient-dental-chart', 'quadrant-two'], navigationExtras);   
  }

  goToQuadrant3(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'patient-dental-chart', 'quadrant-three'], navigationExtras);   
  }

  goToQuadrant4(){
    let navigationExtras : NavigationExtras = {
      state : {
        track_record : this.track_record
      }
    };

    this.router.navigate(['members', 'patient-dental-chart', 'quadrant-four'], navigationExtras);   
  }

}