import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Response } from '@angular/http';
import { UserService } from './user.services'

export let SERVER_URL = 'https://dev.ejogajog.com/ejogajog/api/v1';
const Base_URL = 'https://dev.ejogajog.com/ejogajogAdmin/#/login'

export let API = {
   'logOut': 'user/logout',
   'login': '/auth/adminLogIn',
   'logout': '/common/logOut',
   'changePassword' : '/common/changePassword',
   'usersList': '/admin/users',
    'resetPassword': '/admin/resetUserPass/',
    'resetPasswordUsersList' : '/admin/listPassReq',
    'driverList' : '/admin/pending/drivers',
    'fleetOwnersList' : '/admin/pending/fleetOwners',
    'customersList' : '/admin/pending/customers',
    'agentsList' : '/admin/pending/agents',
    'activeDeactiveUser':'/admin/activate/',
    'approveReject':'/admin/approve/',
    'forgotPassword' : '/auth/forgotPassword',
    'trucksList': '/admin/pending/trucks/',
    'approveTruck': '/admin/approveTruck/',
    'deleteTruck' : '/common/delete/truck',
    'pendingCompanyDetails' : '/admin/pending/companies',
    'approveCompany' : '/admin/approveEnterprise/',
    'agentPerformance' : '/admin/agentPerformance/',
    'agentReferredUsers' : '/admin/refUsers/',
    'notificationUsersList' : '/admin/notificationUsersList',
    'landingPageImage':'/admin/landingPage/image',
    'sendEmail': '/admin/emailNotification',
    'sendSms': '/admin/smsNotification'
};

export function extractData(res: Response) {
   // debugger;
    const body: any = res.json();
    // if (body.success === false) {
    //     throw new Error(body.message);
    // }
    // console.log(body);
    if (body) {
        return {

            'data': body,
            'status': body.success

        };
    } else {
        throw new Error(body.message);
    }
}

export function handleError(error: Response) {
    // debugger;
    // console.error(error);

    if (error) {
        if (error.status == 401) {
            UserService.removeDetails();
            window.location.href = Base_URL;
        }
        return Observable.throw(error.json().message);
    }
}
