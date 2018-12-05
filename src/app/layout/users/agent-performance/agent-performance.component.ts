import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { StartupListService } from '../../../services/startup/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../../shared/services/user.services';
import { ConfirmService } from '../../../shared/services/dialog.service';
import { DataListService } from '../../../shared/services/dataList.service';
import { MESSAGES, PATTERN, FilterList } from '../../../shared/services/message';
@Component({
  selector: 'app-agent-performance',
  templateUrl: './agent-performance.component.html',
  styleUrls: ['./agent-performance.component.scss']
})
export class AgentPerformancComponent implements OnInit {
  filterId: any;
  agentId: any;
  agentFilterQuery: string;
  truckRegistrationPic: any;
  truckRoutePermitPic: any;
  truckTaxTokenPic: any;
  totalItems: any;
  modalImage: any;
  userPage = 1;
  agentFilterPage = 1;
  size = 10;
  agentList: any[];
  agentListQuery: any;
  agentUsersList: any[];
  isDataAvailable = false;

  modalRef: BsModalRef;
  imagemodalRef: BsModalRef;
  constructor( private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _startupListService: StartupListService,
    private flashMessagesService: FlashMessagesService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getAgentPerformanceLsit();
  }
  // Function to get the list of Users registered through Agent's Referral Code
  getAgentPerformanceLsit(event?: any) {
    const id = +this._activatedRoute.snapshot.paramMap.get('id');
    // if(!event){
    //   this.truckListQuery = id + '?page=' + this.userPage + '&size=' + this.size;
    // } else if(event) {
    //   this.userPage = event;
    //   this.truckListQuery = id + '?page=' + this.userPage + '&size=' + this.size;
    // }
    this.agentListQuery = {
      userId : id
    }
    this._startupListService.agentPerformanceList(this.agentListQuery).subscribe(
      responseData => {
        this.agentList = responseData.data.data;
        this.totalItems = responseData.data.data.numberOfResults;
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    });
  }

   // Open Modal to show details of the user
   openModal(template: TemplateRef<any>, agentId,filterId) {
     this.agentId = agentId;
     this.filterId = filterId;
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.getReferredUsers(agentId,filterId);
  }
  // Open Modal to View Enlarged Image
  openImageModal(template: TemplateRef<any>,info:any) {
    this.imagemodalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.modalImage = info;
  }

  getReferredUsers(agentId?:any,filterId?:any,event?:any){
    if(!event){
      this.agentFilterQuery = this.agentId + '?filter=' + this.filterId +  '&page=' + this.agentFilterPage + '&size=' + this.size;
    } else if(event) {
      this.agentFilterPage = event;
      this.agentFilterQuery = this.agentId + '?filter=' + this.filterId +  '&page=' + this.agentFilterPage + '&size=' + this.size;
    }
    
    this._startupListService.agentReferredUsers(this.agentFilterQuery).subscribe(
      responseData => {
        this.agentUsersList = responseData.data.data.contentList;
        this.totalItems = responseData.data.data.totalItems;
        if(this.agentUsersList.length > 0){
          this.isDataAvailable = true;
        } else {
          this.isDataAvailable = false;
        }
        this.totalItems = responseData.data.data.numberOfResults;
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    });
  }
}
