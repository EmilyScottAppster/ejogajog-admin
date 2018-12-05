import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.services';
import { StartupListService } from '../../../services/startup/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ConfirmService } from '../../../shared/services/dialog.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataListService } from '../../../shared/services/dataList.service';
import { MESSAGES, PATTERN } from '../../../shared/services/message';
@Component({
  selector: 'app-reset-password-users-list',
  templateUrl: './reset-password-users-list.component.html',
  styleUrls: ['./reset-password-users-list.component.css']
})
export class ResetPasswordUsersListComponent implements OnInit {

  isDataAvailable: boolean;
  totalItems: any;
  passwordResetList: any[];
  userPage: any;
  query: string;
  messages = MESSAGES;
  constructor(private _userService: UserService,
    private _startupListService: StartupListService,
    private flashMessagesService: FlashMessagesService,
    private _confirm: ConfirmService, private modalService: BsModalService,
    private _dataListService: DataListService) { }

  ngOnInit() {
    this.getPasswordResetList();
  }

  // Get List of Users who have requested for Password Reset
  getPasswordResetList(event?:any){
    if(event === null || event === undefined) {
       this.query = '?page=1&size=10'
    } else {
         this.query = '?page=' + event + '&size=10'
    }
    this.userPage = event;
    this._startupListService.resetPasswordUsersList(this.query).subscribe(
      responseData => {
        this.passwordResetList = responseData.data.data.contentList;
        this.totalItems = responseData.data.data.numberOfResults;
        if (this.passwordResetList.length > 0) {
          this.isDataAvailable = true
        } else {
          this.isDataAvailable = false;
        }
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 5000 });

    });
  }

  // Reset Password
  resetPassword(userId: any) {
    this._startupListService.resetPasswordForUser(userId).subscribe(
     responseData => {
      this.flashMessagesService.show(this.messages.passwordSuccessfullysent, { cssClass: 'alert-success custom-alert ', timeout: 3000 });
      this.getPasswordResetList();
      }, error => {
        this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 5000 });

    });
  }
}
