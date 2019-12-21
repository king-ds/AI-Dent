import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gingiva',
  templateUrl: './gingiva.page.html',
  styleUrls: ['./gingiva.page.scss'],
})
export class GingivaPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : any;
  gingiva : any;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.track_record = this.router.getCurrentNavigation().extras.state.track_record;
        console.log(this.track_record);
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.gingiva = this.track_record['gingiva'];
      this.loader = false;
    }, 2000)
  }
}