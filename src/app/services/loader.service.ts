import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader: any;

  constructor(public loading_controller : LoadingController) { }

  show_loader() {
    if (this.loader) { 
      this.loader.present()
    } else {
      this.loader = this.loading_controller.create({
            message: 'Loading',
        }).then(() => {
            this.loader.present();
        });
      }
    }

  hide_loader() {
    this.loader.dismiss();
    this.loader = null;
  } 
}
