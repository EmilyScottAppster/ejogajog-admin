import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../../shared/services/user.services';
import { StartupListService } from '../../../services/startup/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ConfirmService } from '../../../shared/services/dialog.service';
import { DataListService } from '../../../shared/services/dataList.service';
import {BulkUploadService} from '../../../shared/services/bulkUpload.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backgroundImage',
  templateUrl: './backgroundImage.component.html',
  styleUrls: ['./backgroundImage.component.css']
})
export class BackgroundImageComponent implements OnInit {
  imgFile:any;
  
  constructor(private _userService: UserService,
              private _startupListService: StartupListService,
              private flashMessagesService: FlashMessagesService,
              private _confirm: ConfirmService,
              private _dataListService: DataListService,
              private _bulkUploadService:BulkUploadService,
              public router: Router) { }

  ngOnInit() {
  }
  saveImgFileFormData(event:any){
     this.imgFile = event.target.files;
  }
  UploadImages(){
    if(this.imgFile){
      this._bulkUploadService.UploadImg(this.imgFile[0]).subscribe(bulkUploadImagesResponse => {
        this.router.navigate(['/users/list']);   
        let msg = JSON.parse(bulkUploadImagesResponse);
        this.flashMessagesService.show(msg.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 });
       
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    })
    } else {
      this.flashMessagesService.show('Please upload a file', { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    }
  }
  
}
