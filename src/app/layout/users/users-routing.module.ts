import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from './../../shared';
import { ListComponent } from './list/list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { ResetPasswordUsersListComponent } from './reset-password-users-list/reset-password-users-list.component';
import { PendingAgentsListComponent } from './pending-agents-list/pending-agents-list.component';
import { PendingFleetOwnersListComponent } from './pending-fleet-owners-list/pending-fleet-owners-list.component';
import { PendingCustomersListComponent } from './pending-customers-list/pending-customers-list.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { PendingCompanyDetailsComponent } from './pending-company-details/pending-company-details.component';
import { AgentPerformancComponent } from './agent-performance/agent-performance.component';
import { BackgroundImageComponent } from './backgroundImage/backgroundImage.component'
const routes: Routes = [
    { path: '', component: UsersComponent ,
    children: [
        {path: '', redirectTo: 'list', pathMatch: 'full'},
        { path: 'list', component: ListComponent },
        { path: 'driver-list', component: DriverListComponent },
        { path: 'req-reset-list', component: ResetPasswordUsersListComponent },
        { path: 'pending-customers-list', component: PendingCustomersListComponent },
        { path: 'pending-agents-list', component: PendingAgentsListComponent },
        { path: 'pending-drivers-list', component: DriverListComponent },
        { path: 'pending-fleet-owners-list', component: PendingFleetOwnersListComponent },
        { path: 'truck-list/:id', component: TruckListComponent },
        { path: 'pending-company-details', component: PendingCompanyDetailsComponent },
        { path: 'agent-performance/:id', component: AgentPerformancComponent },
        { path: 'backgroundImg', component: BackgroundImageComponent },

    ] ,
}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
