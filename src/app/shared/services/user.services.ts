import {Http} from '@angular/http'
import {Injectable} from '@angular/core'
@Injectable()
export class UserService {

    static setDetails(data) {
        // window.sessionStorage.setItem('userToken')
      //  console.log('access token', data);
        sessionStorage.setItem('LoggedInUser', JSON.stringify(data));
    }
    static getDetails() {
        return JSON.parse(sessionStorage.getItem('LoggedInUser'));
    }
     static removeDetails() {
        sessionStorage.clear();
    }
    public   clearData(data,dataArray){
        if(data.trim()==''){
            return false;
          }else{
            let obj = dataArray.find(o => o.name == data);
            if(obj==undefined){
              return false;
            }
          }
        }
}
