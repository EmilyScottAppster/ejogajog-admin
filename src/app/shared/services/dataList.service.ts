import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import { ConfigService } from './config.service';
import { SERVER_URL, API, extractData, handleError } from './../../shared/services/config.service';

@Injectable()
export class DataListService {
    _baseUrl: string = '';
    constructor(private _http: InterceptorService) {
        // this._baseUrl = configService.getApiURI();
    }


    getIndustriesList(key, industries) {
      //  debugger;
        industries= industries==undefined ? [] :industries;
         const parameter = JSON.stringify({
             industries: industries,
             searchText: key
         });
         return this._http.post(SERVER_URL + API['industriesList'], parameter, {
         })
             .map(extractData)
             .catch(handleError)
 
    }
      // GET CITY LIST
      getCityList(key,cities?) {
        let url;
        if (key == '') {
            url = SERVER_URL + API['cityList'];
        } else {
            url = SERVER_URL + API['cityList']
        }
        const parameter = JSON.stringify({
            cities:cities,
            searchText:key
        });
        return this._http.post(url,parameter, {
        })
            .map(extractData)
            .catch(handleError)

    }
    getStageList() {
     //   debugger;
        return this._http.get(SERVER_URL + API['stageList'], {
        })
            .map(extractData)
            .catch(handleError)
    }

}
