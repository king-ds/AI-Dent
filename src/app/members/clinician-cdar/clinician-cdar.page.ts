import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Observable } from 'rxjs';
import { StorageService } from './../../services/storage.service';
import { format } from "date-fns";

@Component({
  selector: 'app-clinician-cdar',
  templateUrl: './clinician-cdar.page.html',
  styleUrls: ['./clinician-cdar.page.scss'],
})
export class ClinicianCdarPage implements OnInit {

  all : boolean;
  today : boolean;

  todayCdar : Observable<any>;
  allCdar : Observable<any>;
  emptyTodayCdar : boolean;
  emptyAllCdar : boolean;

  clinician : string;
  searchTerm : string = '';
  debouncer : any;
  loader : boolean;


  date : any;

  constructor(private apiService : ApiService,
              private storageService : StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.today = true;
    this.date = format(new Date(new Date()), "MMMM dd yyyy")
    this.storageService.getObject('clinician').then((result) => {
      this.clinician = result;
      
      this.debouncer = setTimeout(() => {
        this.todayCdar = this.apiService.getTodayCdar(this.clinician['id']);
        this.todayCdar.subscribe((val) => {
          if(val == ''){
            this.emptyTodayCdar = true;
          }else{
            this.emptyTodayCdar = false;
          }
        })
        this.allCdar = this.apiService.getAllCdar(this.clinician['id']);
        this.allCdar.subscribe((val) => {
          console.log(val);
          if(val == ''){
            this.emptyAllCdar = true;
          }else{
            this.emptyAllCdar = false;
          }
        })
        this.loader = false;
        }, 2000)
    });
  }

  activateToday(){
    this.loader = true;
    this.debouncer = setTimeout(() =>{
      this.today = true;
      this.all = false;
      this.loader = false;
    }, 1000);
  }

  activateAll(){
    this.loader = true;
    this.debouncer = setTimeout(() => {
      this.today = false;
      this.all = true;
      this.loader = false;
    }, 1000);
  }

  searchChanged(){
    this.todayCdar = this.apiService.searchTodayCdar(this.searchTerm, this.clinician['id']);
    this.allCdar = this.apiService.searchAllCdar(this.searchTerm, this.clinician['id']);
  }

}