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
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.scss']
})
export class TruckListComponent implements OnInit {
  truckRegistrationPic: any;
  truckRoutePermitPic: any;
  truckTaxTokenPic: any;
  totalItems: any;
  modalImage: any;
  userPage = 1;
  size = 10;
  trucksList: any[];
  truckListQuery:any;
  isDataAvailable = false;
  truckFitnessCertPic: any;
  truckOwnerPic: any;
  userTruckImages: any[];
  modalRef: BsModalRef;
  imagemodalRef: BsModalRef;
  constructor( private readonly _activatedRoute:ActivatedRoute,
    private readonly _router: Router,
    private readonly _startupListService: StartupListService,
    private flashMessagesService: FlashMessagesService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getTruckList();
  }
  // Function to get the list of pending Trucks for the fleet owner
  getTruckList(event?: any) {
    const id = +this._activatedRoute.snapshot.paramMap.get('id');
    if(!event){
      this.truckListQuery = id + '?page=' + this.userPage + '&size=' + this.size;
    } else if(event) {
      this.userPage = event;
      this.truckListQuery = id + '?page=' + this.userPage + '&size=' + this.size;
    }
    this._startupListService.pendingTrucksList(this.truckListQuery).subscribe(
      responseData => {
        this.trucksList = responseData.data.data.contentList;
        this.totalItems = responseData.data.data.numberOfResults;
        if(this.trucksList.length > 0) {
          this.isDataAvailable  = true;
        } else {
          this.isDataAvailable = false;
        }
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    });
  }

   // Open Modal to show details of the user
   openModal(template: TemplateRef<any>, truckFitnessCertificatePhoto: any, 
    truckInsurancePhoto: any,
    truckRegistrationPhoto:any,
    truckRoutePermitPhoto:any,
    truckTaxTokenPhoto:any,
    userTruckPhotos: any[]) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.truckFitnessCertPic = truckFitnessCertificatePhoto;
    this.truckOwnerPic =  truckInsurancePhoto;
    this.truckTaxTokenPic = truckTaxTokenPhoto;
    this.truckRoutePermitPic = truckRoutePermitPhoto;
    this.truckRegistrationPic = truckRegistrationPhoto
    this.userTruckImages = userTruckPhotos;
  }
  // Open Modal to View Enlarged Image
  openImageModal(template: TemplateRef<any>,info:any) {
    this.imagemodalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.modalImage = info;
  }

  // Approve Reject Truck
  approveRejectTruck(truckId,reject){
    let data = {truckId: truckId, reject: reject};
    this._startupListService.approveRejectTruck(data).subscribe(
      responseData => {
        this.flashMessagesService.show(responseData.data.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 })
        if(this.userPage!==1 && this.trucksList.length ==1){
          this.getTruckList(1)
        } else {
          this.getTruckList(this.userPage);
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
      if(this.userPage!==1 && this.trucksList.length == 1){
        this.getTruckList(1)
      } else {
        this.getTruckList(this.userPage);
      }
    }, error => {
      this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
  });
  }
}
