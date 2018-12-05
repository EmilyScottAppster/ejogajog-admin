import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { StartupListService } from '../../../services/startup/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../../shared/services/user.services';
import { DataListService } from '../../../shared/services/dataList.service';
import { MESSAGES, PATTERN, FilterList } from '../../../shared/services/message';
import { NotificationService } from '../../../services/notification.service';
@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss']
})
export class SendSmsComponent implements OnInit {
  sendSms: string;
  smsRequest: { 'filter': number; 'message': any; };
  isUserDataAvailable: boolean;
  totalItems: any;
  usersList: any;
  query: string;
  modalRef: BsModalRef;
  imagemodalRef: BsModalRef;
  page = 1;
  size = 10;
  filter = 0;
  filterList = FilterList;
  selectedType = FilterList[0].id;
  constructor( private readonly _activatedRoute:ActivatedRoute,
    private readonly _router: Router,
    private readonly _startupListService: StartupListService,
    private flashMessagesService: FlashMessagesService,
    private modalService: BsModalService,
    private readonly _notificationService: NotificationService
  ) { }
  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(event?:any, operation?:any){
    if(event == null || event === undefined ){
      this.query = '?page=' + this.page + '&size=' + this.size + '&filter=' + this.filter;
    } else if(operation == 'filter') {
      this.page = 1;
      this.query = '?page=' + this.page + '&size=' + this.size + '&filter=' + event;
      this.selectedType = event;
    } else if(operation == 'paginate'){
      this.page = event;
      this.query = '?page=' + this.page + '&size=' + this.size + '&filter=' + this.selectedType;
    }
    this._notificationService.notificationsUsersList(this.query).subscribe(
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

sendSmsNotification(sms:any){
  if(sms !== undefined && sms !=null && sms!==''){
    if(sms.length<5){
      this.flashMessagesService.show('Please enter atleast 5 characters', { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    } else {
      this.smsRequest = {
        'filter': this.selectedType,
        'message': sms
      }
      this._notificationService.sendSms(this.smsRequest).subscribe(
        responseData => {
          this.sendSms = '';
          this.flashMessagesService.show(responseData.data.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 });
        }, error => {
          this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
      });
    }
  } else {
    this.flashMessagesService.show('Please enter a message', { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
  }
}
}
