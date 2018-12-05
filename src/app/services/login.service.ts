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
export class LoginService {
        _baseUrl: string = '';
        constructor(private _http: InterceptorService) {
                // this._baseUrl = configService.getApiURI();
        }


        getUserInfo(data: any) {
               // debugger;
                const parameter = JSON.stringify({
                        email: data.email,
                        password: data.password,
                      
                });
              //  console.log(parameter);
                return this._http.post(SERVER_URL + API['login'], parameter, {
                })
                    .map(extractData)
                    .catch(handleError)
              }
        forgotPassword() {
                return this._http.post(SERVER_URL + API['forgotPassword'], {
                })
                    .map(extractData)
                    .catch(handleError)
              }
        logoutUser() {
                return this._http.get(SERVER_URL + API['logout'], {
                })
                    .map(extractData)
                    .catch(handleError)
        }

        changePassword(data) {
                return this._http.post(SERVER_URL + API['changePassword'], data, {
                })
                    .map(extractData)
                    .catch(handleError)
              }


}
