import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-female',
  templateUrl: './female.page.html',
  styleUrls: ['./female.page.scss'],
})
export class FemalePage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : boolean;

  female : any;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.female = this.track_record['female'];
      this.loader = false;
    }, 2000)
  }
}
