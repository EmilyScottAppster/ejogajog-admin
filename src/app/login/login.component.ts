import { Component, OnInit ,TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MESSAGES, PATTERN } from '../shared/services/message';
import { LoginService } from '../services/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../shared/services/user.services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {NgbModal, NgbActiveModal, NgbModule, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    messages = MESSAGES;
    pattern = PATTERN;
    loginForm: FormGroup;
    userForm:FormGroup;
    submitted;
    userSubmitted=false;
    serverError: string;
    public modalRef: BsModalRef;
    ngbModalOptions
    constructor(private modalService: BsModalService,public router: Router, fb: FormBuilder, private _loginService: LoginService,
        private flashMessagesService: FlashMessagesService) {
        this.loginForm = fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.pattern.email)])],
            'password': ['', Validators.compose([Validators.required])]
        })
        this.userForm = fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.pattern.email)])],
        })

    }

    ngOnInit() {
        this.ngbModalOptions = {
            backdrop : 'static',
            keyboard : false,
            class:'modal-lg'
      };
    }

    submitForm(value: any): void {
        if (this.loginForm.valid) {
            this.submitted = false;
            this._loginService.getUserInfo(value).subscribe(
                response => {
                    if (response.status === false) {
                        //this.flashMessagesService.show(response.data.message, { cssClass: 'alert-danger custom-alert ', timeout: 5000 });
                        this.serverError = response.data.message;
                        return;
                    } else {
                        this.submitted = false;
                        UserService.setDetails(response.data);
                        this.router.navigateByUrl('/');
                    }

                },
                error => {
                    this.serverError = error;
                    // this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 5000 });

                });
        } else {
            this.submitted = true;
        }
    }
    public openModal(editTeam: TemplateRef<any>, selMemeber?) {
        // this.youSubmitted = false;
        this.userSubmitted = false;
        
        this.modalRef = this.modalService.show(editTeam,this.ngbModalOptions);

    }

    forgotPassword() {
        this._loginService.forgotPassword().subscribe(
            forgotPasswordResponse => {
                this.flashMessagesService.show(forgotPasswordResponse.data.message,
                    { cssClass: 'alert-success custom-alert ', timeout: 5000 });
            },
            error => {
                this.serverError = error;
                 this.flashMessagesService.show(error, { cssClass: 'alert-danger custom-alert ', timeout: 5000 });

            });
    }

    
}
