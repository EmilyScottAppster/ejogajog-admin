import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.services';
import { LoginService } from '../../../services/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { MESSAGES, PATTERN } from '../../../shared/services/message';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../match-password/match-password';
import {NgbModal, NgbActiveModal, NgbModule, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public modalRef: BsModalRef;
    messages = MESSAGES;
    pattern = PATTERN;
    user = {
        firstName: '',
        lastName: '',
        countryCode: '',
        phone: ''
    }
    submitted=false;
    youSubmitted = false;
    youForm: FormGroup;
    ngbModalOptions
    constructor(fb: FormBuilder,public router: Router, public _loginService: LoginService, private flashMessagesService: FlashMessagesService
        , private modalService: BsModalService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });

        this.youForm = fb.group({
            'password': ['', Validators.compose([Validators.required, Validators.pattern(this.pattern.password)])],
            'confirmPassword': ['', Validators.compose([Validators.required])],
            'newPassword': ['', Validators.compose([Validators.required])]

        }, {
                validator: PasswordValidation.MatchPassword // your validation method
            })
    }

    ngOnInit() {

         this.ngbModalOptions = {
            backdrop : 'static',
            keyboard : false,
            class:'modal-lg'
      };
     }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }
    onLoggedout() {
        this._loginService.logoutUser().subscribe(
            response => {
                UserService.removeDetails();

            },
            error => {
                this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });

            });
    }

    // EDTI MEMBER MODAL
    public openModal(editTeam: TemplateRef<any>, selMemeber?) {
        this.youSubmitted = false;
        this.submitted = false;
        // this._usersListService.getUserDetail().subscribe(
        //     response => {
        //         debugger;
        //         this.user = response.data.data;

        //     },
        //     error => {
        //         this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });

        //     });
        // this.selectedMember = selMemeber;
        // this.startupEditForm.controls['name'].setValue(this.selectedMember.role);
        this.modalRef = this.modalService.show(editTeam,this.ngbModalOptions);

    }

    // Close popup
    closeModel(form) {
        this.submitted = false;
        this.youSubmitted=false;
        //form.resetForm();
        this.modalRef.hide();
      }

      changePassword(formvalue:any){
          if(this.youForm.valid) {
            const postData = {
                'oldPass': formvalue.newPassword,
                'newPass': formvalue.password
              }
              this._loginService.changePassword(postData).subscribe(userData => {
                this.flashMessagesService.show(userData.data.message, { cssClass: 'alert-success custom-alert ', timeout: 3000 })
                this.modalRef.hide();
                this.youForm.reset();
                UserService.removeDetails();
                this.router.navigate(['/login']);
    
              }, error => {
                this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 3000 });
    
            });
        }else{
          this.youSubmitted = true;
          this.submitted = true;
        }
      }
}
