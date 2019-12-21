import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social-history',
  templateUrl: './social-history.page.html',
  styleUrls: ['./social-history.page.scss'],
})
export class SocialHistoryPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : boolean;

  socialHistory : any;
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
      this.socialHistory = this.track_record['social_history'];
      this.loader = false;
    }, 2000)
  }
}
