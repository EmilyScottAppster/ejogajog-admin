import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StartupListService } from '../../services/startup/list.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NotificationComponent } from './notification.component';
import { NotificationRoutingModule } from './notification-routing.module';
import { PageHeaderModule } from './../../shared';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../sharedModule/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {SendEmailComponent} from './send-email/send-email.component';
import {SendSmsComponent} from './send-sms/send-sms.component'
import {NotificationService} from '../../services/notification.service'
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NotificationRoutingModule,
        PageHeaderModule,
        NgxPaginationModule,
        ModalModule.forRoot(),
        SharedModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
    ],
    declarations: [NotificationComponent,
                SendSmsComponent,
                SendEmailComponent
            ],
    providers: [StartupListService, NotificationService]
})
export class NotificationModule { }
