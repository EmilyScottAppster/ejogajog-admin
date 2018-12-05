import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserService } from '../../shared/services/user.services';
// import { InterceptorService } from 'ng2-interceptors';
// import { ConfigService } from './config.service';
import { SERVER_URL, API, extractData, handleError } from './../../shared/services/config.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Injectable()
export class BulkUploadService {
        _baseUrl: string = '';
        constructor(public spinnerService: SpinnerService, public userService: UserService, private _http: Http, 
            private _flashMessagesService: FlashMessagesService,) {
                // this._baseUrl = configService.getApiURI();
        }


        UploadImg(data: any) {
            this.spinnerService.showLoader.next(true);
            return Observable.create(observer => {
                    // const parameter = JSON.stringify(data);
                    const formData = new FormData();
                    formData.append('image', data)
               //     console.log(formData);
                   // debugger
                    const xhr: XMLHttpRequest = new XMLHttpRequest();
                    xhr.open('POST', SERVER_URL + API['landingPageImage'], true);
                    xhr.onreadystatechange = () => {
                            if (xhr.readyState === 4) {
                                    this.spinnerService.showLoader.next(false);
                                   // debugger;
                                    if (xhr.status === 200) {
                                            observer.next(xhr.response);
                                            observer.complete();
                                    } else {
                                            observer.error(JSON.parse(xhr.response).message);
                                            this._flashMessagesService.show(JSON.parse(xhr.response).message, {
                                                    cssClass: 'alert-danger custom-alert ', timeout: 5000
                                            });

                                    }
                            }
                    };
                    const userToken = UserService.getDetails()
                   // debugger;
                    // enctype For Multipart Request
                    xhr.setRequestHeader('enctype', '"multipart/form-data');
                    // IE bug fixes to clear cache
                    xhr.setRequestHeader('Cache-Control', 'no-cache');
                    xhr.setRequestHeader('Cache-Control', 'no-store');
                    xhr.setRequestHeader('Pragma', 'no-cache');
                    if (userToken) {
                           // debugger;
                            xhr.setRequestHeader('authtoken',userToken.data.token);
                    }
                    // For Admin- language code is fixed 
                    // xhr.setRequestHeader('langCode', '1');
                    // xhr.setRequestHeader("userId", logigedInUser.data.userId);
                    // xhr.setRequestHeader("roleId", logigedInUser.data.roleId);

                    xhr.send(formData);
                    return xhr;
            })
}

geImportCount(id) {
        const headers = new Headers();
        const userToken = UserService.getDetails()
        headers.append('authtoken', userToken.data.token)
        headers.append('Access-Control-Allow-Origin', '*')
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        return this._http.get(SERVER_URL + API['importCount'] + '?importId=' + id, {
                headers: headers
        })
            .map(extractData)
            .catch(handleError)
        }
}
