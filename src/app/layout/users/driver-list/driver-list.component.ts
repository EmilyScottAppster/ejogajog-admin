import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../../shared/services/user.services';
import { StartupListService } from '../../../services/startup/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ConfirmService } from '../../../shared/services/dialog.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataListService } from '../../../shared/services/dataList.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  noDataAvailable: boolean;
  modalImage: any;
  userDetail: any;
  driverList: any[];
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
    this.getDriverList();
  }
  // Get Driver List
  getDriverList(event?:any){
    if(event === null || event === undefined) {
       this.query = '?page=1&size=10'
    } else {
         this.query = '?page=' + event + '&size=10'
    }
    this.userPage = event;
    this._startupListService.driverList(this.query).subscribe(
      responseData => {
        this.driverList = responseData.data.data.contentList;
        this.totalItems = responseData.data.data.numberOfResults;
        if(this.driverList.length == 0){
          this.noDataAvailable = true;
        } else{
          this.noDataAvailable = false;
        }
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    });
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
        this.flashMessagesService.show(responseData.data.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 })
        if(this.userPage !==1 && this.driverList.length ==1){
          this.getDriverList(1);
        } else {
          this.getDriverList(this.userPage);
        }
       
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    });
  }
}
