import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { StartupListService } from '../../../services/startup/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../../shared/services/user.services';
import { ConfirmService } from '../../../shared/services/dialog.service';
import { DataListService } from '../../../shared/services/dataList.service';
import { MESSAGES, PATTERN, FilterList } from '../../../shared/services/message';
import * as moment from 'moment';
import {UTCtoLocal} from '../../../shared/pipes/utcToLocal.pipe'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isUserDataAvailable: boolean;
  modalImage: any;
  userDetail: any;
  query: string;
  usersList: any[];
  messages = MESSAGES;
  pattern = PATTERN;
  filterList = FilterList;
  selectedType = FilterList[0];
  form;
  pageSize: number;
  nextPage: number;
  totalPages: number;
  totalItems: number;
  userPage = 1;
  modalRef: BsModalRef;
  imagemodalRef: BsModalRef;
  searchInput: any;
  selectedFilter = FilterList[0].id;
  isFilter: any;
  listOperation: any;
  constructor(private _userService:UserService,private _startupListService: StartupListService, 
    private flashMessagesService: FlashMessagesService,
    private _confirm: ConfirmService, private modalService: BsModalService,
    private _dataListService: DataListService,
    private readonly _router: Router) { }

  ngOnInit() {
   
    const user = UserService.getDetails();
    this.getUsersList();
  }
  // Get List of Users

  getUsersList(event?:any, operation?:any){
    if(!operation && !event) {
      this.query = '?page=' + this.userPage + '&size=10';
    } else if (operation) {
        this.isFilter = operation;
        if (this.isFilter === 'filter') {
          this.selectedFilter = event;
          this.userPage = 1;
          if (this.searchInput) {
            this.query = '?page=' + this.userPage + '&size=10' + '&query=' + this.searchInput + '&filter=' + this.selectedFilter;
          } else {
            this.query = '?page=1' + '&size=10' + '&filter=' + this.selectedFilter;
          }
        } else if (this.isFilter === 'search'){
          this.userPage = 1;
          this.query = '?page=1' + '&size=10' + '&query=' + event + '&filter=' + this.selectedFilter;
        }
    } else if (event) {
      this.userPage = event;
      if (this.searchInput) {
        this.query = '?page=' + this.userPage + '&size=10' + '&query=' + this.searchInput + '&filter=' + this.selectedFilter;
      } else {
        this.query = '?page=' + this.userPage + '&size=10' + '&filter=' + this.selectedFilter;
      }
    }
    this._startupListService.usersList(this.query).subscribe(
          responseData => {
            this.usersList = responseData.data.data.contentList;
            this.totalItems = responseData.data.data.numberOfResults;
            if(this.usersList.length > 0){
              this.isUserDataAvailable = true
            } else {
              this.isUserDataAvailable = false;
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

  openImageModal(template: TemplateRef<any>,info:any) {
    this.imagemodalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.modalImage = info;
  }
activeDeactiveUsers(userId,isActive){
  let data={userId:userId,isActive:isActive}
    this._startupListService.activeDeactiveUser(data).subscribe(result => {
      this.flashMessagesService.show(result.data.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 })
      this.getUsersList();
    }, error => {
      this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
  });
}

// Function to redirect the admin to the truck list for approved fleet owners
  redirectToTruckList(userId: any) {
  this._router.navigate(['/users/truck-list/', userId]);
}

redirectToAgentPerformance(userId: any) {
  this._router.navigate(['/users/agent-performance/', userId]);
}
}
