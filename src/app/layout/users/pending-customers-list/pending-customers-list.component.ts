import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../../shared/services/user.services';
import { StartupListService } from '../../../services/startup/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ConfirmService } from '../../../shared/services/dialog.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataListService } from '../../../shared/services/dataList.service';

@Component({
  selector: 'app-pending-customers-list',
  templateUrl: './pending-customers-list.component.html',
  styleUrls: ['./pending-customers-list.component.css']
})
export class PendingCustomersListComponent implements OnInit {
  noDataAvailable: boolean;
 modalImage: any;
    userDetail: any;
    customersList: any;
    totalItems: any;
    userPage: any;
    query: string;
    modalRef: BsModalRef;
    imagemodalRef: BsModalRef;
    constructor(private _userService: UserService,
                private _startupListService: StartupListService,
                private flashMessagesService: FlashMessagesService,
                private _confirm: ConfirmService, private modalService: BsModalService,
                private _dataListService: DataListService) { }
  
    ngOnInit() {
      this.getCustomerList();
    }
    // Get Driver List
    getCustomerList(event?:any){
      if(event === null || event === undefined) {
         this.query = '?page=1&size=10'
      } else {
           this.query = '?page=' + event + '&size=10'
      }
      this.userPage = event;
      this._startupListService.customerList(this.query).subscribe(
        responseData => {
          this.customersList = responseData.data.data.contentList;
          this.totalItems = responseData.data.data.numberOfResults;
          if(this.customersList.length == 0){
            this.noDataAvailable = true;
          } else{
            this.noDataAvailable = false;
          }
        }, error => {
          this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
      }
      )
    }
  
     // Open Modal to show details of the user
     openModal(template: TemplateRef<any>,info:any) {
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
      this.userDetail = info;
    }
    
    // Open new modal to show enlarged image
    openImageModal(template: TemplateRef<any>,info:any) {
      this.imagemodalRef = this.modalService.show(template, {class: 'modal-lg'});
      this.modalImage = info;
    }
    approveRejectDriver(userId,roleId,reject){
      let data={userId:userId,roleId:roleId,reject:reject};
      this._startupListService.approveReject(data).subscribe(
        responseData => {
          this.flashMessagesService.show(responseData.data.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 });
          if(this.userPage !=1 && this.customersList.length ==1){
            this.getCustomerList(1);
          } else {
            this.getCustomerList(this.userPage);
          }
        }, error => {
          this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
      }
      )
    } 
  }
  
