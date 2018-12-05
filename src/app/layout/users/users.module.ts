import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StartupListService } from '../../services/startup/list.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { PageHeaderModule } from './../../shared';
import { ListComponent } from './list/list.component';
import { ConfirmService } from '../../shared/services/dialog.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../sharedModule/shared.module';
// import { OrdinalPipe } from '../../shared/pipes/date.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {UTCtoLocal} from '../../shared/pipes/utcToLocal.pipe';
import { DriverListComponent } from './driver-list/driver-list.component';
import { ResetPasswordUsersListComponent } from './reset-password-users-list/reset-password-users-list.component';
import { PendingCustomersListComponent } from './pending-customers-list/pending-customers-list.component';
import { PendingAgentsListComponent } from './pending-agents-list/pending-agents-list.component';
import { PendingFleetOwnersListComponent } from './pending-fleet-owners-list/pending-fleet-owners-list.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { PendingCompanyDetailsComponent } from './pending-company-details/pending-company-details.component';
import { AgentPerformancComponent } from './agent-performance/agent-performance.component';
import { BackgroundImageComponent } from './backgroundImage/backgroundImage.component'
import {BulkUploadService} from '../../shared/services/bulkUpload.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UsersRoutingModule,
        PageHeaderModule,
        NgxPaginationModule,
        ModalModule.forRoot(),
        SharedModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
    ],
    declarations: [UsersComponent,
                ListComponent,
                UTCtoLocal,
                DriverListComponent,
                ResetPasswordUsersListComponent,
                PendingCustomersListComponent,
                PendingAgentsListComponent,
                PendingFleetOwnersListComponent,
                TruckListComponent,
                PendingCompanyDetailsComponent,
                AgentPerformancComponent,
                BackgroundImageComponent],
    providers: [StartupListService, ConfirmService,BulkUploadService]
})
export class UsersModule { }
