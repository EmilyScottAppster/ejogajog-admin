import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StartupListService } from '../../../services/startup/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pending-company-details',
  templateUrl: './pending-company-details.component.html',
  styleUrls: ['./pending-company-details.component.scss']
})
export class PendingCompanyDetailsComponent implements OnInit {

  gatewayDetails: any;
  userPaymentGateways: any;
  userCertificates: any;
  bankDetailsUser: any;
  modalImage: any;
  size = 10;
  userPage: any;
  isDataAvailable: boolean;
  totalItems: any;
  companiesList: any[];
  companiesListQuery: string;
  modalRef: BsModalRef;
  imagemodalRef: BsModalRef;
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _startupListService: StartupListService,
    private flashMessagesService: FlashMessagesService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getCompaniesList(1);
  }

  getCompaniesList(event?: any) {
    if(!event){
      this.companiesListQuery = '?page=' + this.userPage + '&size=' + this.size;
    } else if(event) {
      this.userPage = event;
      this.companiesListQuery = '?page=' + this.userPage + '&size=' + this.size;
    }
    this._startupListService.companiesList(this.companiesListQuery).subscribe(
      responseData => {
        this.companiesList = responseData.data.data.contentList;
        this.totalItems = responseData.data.data.numberOfResults;
        if(this.companiesList.length > 0) {
          this.isDataAvailable  = true;
        } else {
          this.isDataAvailable = false;
        }
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    });
  }

   // Open Modal to show details of the user
   openModal(template: TemplateRef<any>,
    bankDetails: any,
    certificates: any,
    paymentGateways: any
    ) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.bankDetailsUser = bankDetails;
    this.userCertificates = certificates;
    this.userPaymentGateways = paymentGateways;
  }
  // Open Modal to View Enlarged Image
  openImageModal(template: TemplateRef<any>) {
    this.imagemodalRef = this.modalService.show(template, {class: 'modal-lg height-modal'});
    this.gatewayDetails = this.userPaymentGateways;
  }

  // Approve Reject Truck
  approveRejectCompany(truckId,reject){
    let data = {companyId: truckId, reject: reject};
    this._startupListService.approveRejectCompany(data).subscribe(
      responseData => {
        this.flashMessagesService.show(responseData.data.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 })
        if(this.userPage!==1 && this.companiesList.length ==1){
          this.getCompaniesList(1)
        } else {
          this.getCompaniesList(this.userPage);
        }
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    }
    )
  }

  // Delete Truck

  deleteTruck(id: any) {
    const query = {
      id : id
    }
    this._startupListService.deleteTruck(query).subscribe(responce => {
      this.flashMessagesService.show(responce.data.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 });
      if(this.userPage!==1 && this.companiesList.length == 1){
        this.getCompaniesList(1)
      } else {
        this.getCompaniesList(this.userPage);
      }
    }, error => {
      this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
  });
  }

}
