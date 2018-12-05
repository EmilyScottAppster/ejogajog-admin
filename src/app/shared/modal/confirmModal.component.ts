
import { Component, OnInit } from '@angular/core';
import { ConfirmService } from '../services/dialog.service';

@Component({
    selector: 'app-confirm',
    template: `
 <div id="confirmationModal" class="modal" role="dialog">
  <div class="modal-dialog custom-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">{{title}}</h4>
      </div>
       <div class="modal-body">
        <p>{{message}}</p>
      </div>
      <div class="modal-footer">

<div [hidden]="!isConfirm" class="text-center">
        <button type="button" class="btn btn-black modal-btn" id="cancelButton" >{{cancelText}}</button>

        <button type="button" class="btn btn-black modal-btn" id="okButton">{{okText}}</button>
</div>
<div [hidden]="isConfirm" class="text-center">
      
        <button type="button" class="btn btn-black modal-btn" id="okButton">{{okText}}</button>
</div>
      </div>
    </div>
  </div>
</div>
  `
})
export class ConfirmDialog implements OnInit {
    public title: string;
    public message: string;
    public okText: string;
    public cancelText: string;
    public isConfirm: boolean = true;
    private _defaults = {
        title: 'Confirm',
        message: 'Confirm the operation?',
        cancelText: 'Cancel',
        okText: 'OK'
    };
    private _confirmElement: any;
    private _cancelButton: any;
    private _okButton: any;

    constructor(confirmService: ConfirmService) {
        // assign a function to the property activate of ConfirmService.
        // After this, calling activate on ConfirmService will cause the function activate
        // from ConfirmComponent to be executed.
        confirmService.activate = this.activate.bind(this);
    }

    private setLabels(message = this._defaults.message, title = this._defaults.title, btnText) {
        this.title = title;
        this.message = message;
        if (this.title != "Confirm")
            this.isConfirm = false;
        else
            this.isConfirm = true;
        if (btnText!=undefined && btnText != "")
            this.okText = btnText;
        else
            this.okText = this._defaults.okText;

        this.cancelText = this._defaults.cancelText;
    }

    activate(message = this._defaults.message, title = this._defaults.title,btnText) {
        this.setLabels(message, title, btnText);
       
        let promise = new Promise<boolean>(resolve => {
            this.show(resolve);
        });
        return promise;
    }

    private show(resolve: (boolean) => any) {
        document.onkeyup = null;

        let negativeOnClick = (e: any) => resolve(false);
        let positiveOnClick = (e: any) => resolve(true);

        if (!this._confirmElement || !this._cancelButton || !this._okButton) {
            return;
        }
        this._confirmElement.style.opacity = 0;
        this._confirmElement.style.zIndex = 9999;

        this._cancelButton.onclick = ((e: any) => {
            e.preventDefault();
            if (!negativeOnClick(e)) {
                this.hideDialog();
            }
        });

        this._okButton.onclick = ((e: any) => {
            e.preventDefault();
            if (!positiveOnClick(e)) {
                this.hideDialog();
            }
        });

        this._confirmElement.onclick = () => {
            this.hideDialog();
            return negativeOnClick(null);
        };

        //document.onkeyup = (e: any) => {
        //    if (e.which === KEY_ESC) {
        //        this.hideDialog();
        //        return negativeOnClick(null);
        //    }
        //};


        this._confirmElement.style.opacity = 1;
        this._confirmElement.style.display = 'block';
    }

    private hideDialog() {
        document.onkeyup = null;
        this._confirmElement.style.opacity = 0;
        window.setTimeout(() => this._confirmElement.style.zIndex = -1, 400);
    }

    ngOnInit(): any {
        this._confirmElement = document.getElementById('confirmationModal');
        this._cancelButton = document.getElementById('cancelButton');
        this._okButton = document.getElementById('okButton');
    }
}