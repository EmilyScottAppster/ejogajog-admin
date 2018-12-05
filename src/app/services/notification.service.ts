import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import { ConfigService } from './config.service';
declare var Fingerprint2: any;
import { SERVER_URL, API, extractData, handleError } from './../shared/services/config.service';
import { retry } from 'rxjs/operator/retry';

@Injectable()
export class NotificationService {
    _baseUrl: string = '';
    constructor(private _http: InterceptorService) {
        // this._baseUrl = configService.getApiURI();
    }

    notificationsUsersList(query){
        return this._http.get(SERVER_URL + API['usersList'] + query, {
        })
            .map(extractData)
            .catch(handleError)
}

sendEmail(emailRequest) {
    return this._http.post(SERVER_URL + API['sendEmail'], emailRequest , {
    })
        .map(extractData)
        .catch(handleError)
}
sendSms(smsRequest) {
    return this._http.post(SERVER_URL + API['sendSms'], smsRequest , {
    })
        .map(extractData)
        .catch(handleError)
}
}
