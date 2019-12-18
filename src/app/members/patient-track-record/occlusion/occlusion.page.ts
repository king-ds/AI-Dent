import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-occlusion',
  templateUrl: './occlusion.page.html',
  styleUrls: ['./occlusion.page.scss'],
})
export class OcclusionPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  occlusion : any;

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
      this.occlusion = this.track_record[0]['occlusion'];
      this.loader = false;
    }, 2000);
  }
}