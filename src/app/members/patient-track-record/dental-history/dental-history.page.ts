import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dental-history',
  templateUrl: './dental-history.page.html',
  styleUrls: ['./dental-history.page.scss'],
})
export class DentalHistoryPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  dentalHistory : any;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.dentalHistory = this.track_record[0]['dental_history'];
      this.loader = false;
    }, 2000)
  }
}