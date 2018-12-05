import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import { Injectable } from '@angular/core'
import { XHRBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { UserService } from '../shared/services/user.services';
import { SpinnerService } from '../shared/services/spinner.service';
@Injectable()
export class ServerURLInterceptor implements Interceptor  {
    showLoader: boolean;
    constructor(public spinnerService: SpinnerService, public userService: UserService) {
      
    }

    // Interceptor for request
    public interceptBefore(request: InterceptedRequest): InterceptedRequest {
        this.spinnerService.showLoader.next(true);
        
        // this.spinnerService.setLoader(true);
        // Do whatever with request: get info or edit it
        // debugger;
        const headers = this.getHeader();
       
        const options = new RequestOptions({ headers: headers, });
        request.options.headers = headers;
        return request;
      
    }

    // Interceptor for response
    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        // debugger;
        this.spinnerService.showLoader.next(false);
        // Do whatever with response: get info or edit it
       // this.spinnerService.setLoader(false);
        return response;
    }

    getHeader() {
        const headers = new Headers();
        const user = UserService.getDetails()
        // debugger
        if ( user) {
           // debugger
            headers.append('authtoken', user.data.token)
            headers.append('Access-Control-Allow-Origin', '*')
            headers.append('Content-Type', 'application/json')
            headers.append('Accept', 'application/json')
        } else {
            // debugger
            headers.append('Access-Control-Allow-Origin', '*')
            headers.append('Content-Type', 'application/json')
            headers.append('Accept', 'application/json')
        }
        return headers;
    }
   
}
