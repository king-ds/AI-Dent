import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.page.html',
  styleUrls: ['./allergies.page.scss'],
})
export class AllergiesPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : boolean;
  allergies : any;

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
      this.allergies = this.track_record[0]['allergy'];
      this.loader = false;
    }, 2000);
  }
}
