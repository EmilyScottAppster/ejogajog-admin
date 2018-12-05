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
export class StartupListService {
    _baseUrl: string = '';
    constructor(private _http: InterceptorService) {
        // this._baseUrl = configService.getApiURI();
    }
    usersList(query){
        return this._http.get(SERVER_URL + API['usersList'] + query, {
        })
            .map(extractData)
            .catch(handleError)
}

resetPasswordForUser(userId: any) {
    return this._http.get(SERVER_URL + API['resetPassword'] + userId, {
    })
        .map(extractData)
        .catch(handleError)
  }

driverList(query){
    return this._http.get(SERVER_URL + API['driverList'] + query, {
    })
        .map(extractData)
        .catch(handleError)
}
agentList(query){
    return this._http.get(SERVER_URL + API['agentsList'] + query, {
    })
        .map(extractData)
        .catch(handleError)
}
customerList(query){
    return this._http.get(SERVER_URL + API['customersList'] + query, {
    })
        .map(extractData)
        .catch(handleError)
}
fleetOwnerList(query){
    return this._http.get(SERVER_URL + API['fleetOwnersList'] + query, {
    })
        .map(extractData)
        .catch(handleError)
}
approveReject(query){
    return this._http.get(SERVER_URL + API['approveReject'] + query.userId+'?roleId='+query.roleId+'&reject='+query.reject, {
    })
        .map(extractData)
        .catch(handleError)
}
activeDeactiveUser(query){
    return this._http.get(SERVER_URL + API['activeDeactiveUser'] + query.userId+'?deact='+query.isActive, {
    })
        .map(extractData)
        .catch(handleError)
}
resetPasswordUsersList(query){
    return this._http.get(SERVER_URL + API['resetPasswordUsersList'] + query, {
    })
        .map(extractData)
        .catch(handleError)
}
 // Get the List of Pending trucks which need to be approved by Admin
pendingTrucksList(query) {
    return this._http.get(SERVER_URL + API['trucksList'] + query, {
    })
        .map(extractData)
        .catch(handleError)
}

// Approve/Reject Pending Trucks
approveRejectTruck(query) {
    return this._http.get(SERVER_URL + API['approveTruck'] + query.truckId + '?reject=' + query.reject, {
    })
        .map(extractData)
        .catch(handleError)
}

deleteTruck(query) {
    return this._http.post(SERVER_URL + API['deleteTruck'], query , {
    })
        .map(extractData)
        .catch(handleError)
}

companiesList(query){
    return this._http.get(SERVER_URL + API['pendingCompanyDetails'] + query, {
    })
        .map(extractData)
        .catch(handleError)
}

// Approve/Reject Pending Trucks
approveRejectCompany(query) {
    return this._http.get(SERVER_URL + API['approveCompany'] + query.companyId + '?reject=' + query.reject, {
    })
        .map(extractData)
        .catch(handleError)
}

agentPerformanceList(query) {
    return this._http.get(SERVER_URL + API['agentPerformance'] + query.userId, {
    })
        .map(extractData)
        .catch(handleError)
}

agentReferredUsers(query){
    return this._http.get(SERVER_URL + API['agentReferredUsers'] + query, {
    })
        .map(extractData)
        .catch(handleError)
}

}
