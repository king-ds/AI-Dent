import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( public storage : Storage ) { 
  }

  async set(key : string, value : any): Promise <any>{
    try {
      const result = await this.storage.set(key, value);
      console.log('Set string in storage: '+result);
      return true;
    } catch (error){
      console.log(error)
      return false;
    }
  }

  async get(key : string) : Promise <any>{
    try{
      const result = await this.storage.get(key);
      console.log('Get storage with key: '+key+' and value : '+result);
      if (result != null){
        return result
      }
      return null;
    }catch(error){
      console.log(error);
      return null;
    }
  }

  async setObject(key: string, object: object) : Promise <any>{
    try{
      const result = await this.storage.set(key, JSON.stringify(object));
      console.log('Set string in storage: '+result);
      return true;
    } catch (error){
      console.log(error);
      return false;
    }
  }

  async getObject(key: string) : Promise<any> {
    try {
      const result = await this.storage.get(key);
      if(result != null){
        return JSON.parse(result);
      }
      return null;
    } catch (error){
      console.log(error)
      return null;
    }
  }

  remove(key : string){
    this.storage.remove(key);
  }
}
