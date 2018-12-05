import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { PageHeaderModule } from './../../shared';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { SendEmailComponent } from './send-email/send-email.component';
const routes: Routes = [
    { path: '', component: NotificationComponent ,
    children: [
        {path: '', redirectTo: 'sendSms', pathMatch: 'full'},
        { path: 'sendSms', component: SendSmsComponent },
        { path: 'sendEmail', component: SendEmailComponent },
    ] ,
}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationRoutingModule { }
