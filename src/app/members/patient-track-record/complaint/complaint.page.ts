import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.page.html',
  styleUrls: ['./complaint.page.scss'],
})
export class ComplaintPage implements OnInit {

  track_record : any;
  debouncer : any;
  loader : boolean;
  isReadOnly = true;

  complaint : any;

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute,
              private apiService : ApiService,) { 
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
      this.complaint = this.track_record[0]['additional_personal_data'];
      this.loader = false;
    }, 2000)
  }
}