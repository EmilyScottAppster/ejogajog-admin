
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiEqualToValidator } from '../../shared/validate/multi-equalTo';
import { OnlyNumber } from '../../shared/validate/onlynumber.directive';
import {SelectModule} from 'ng2-select';
import { ConfirmDialog } from '../../shared/modal/confirmModal.component';
import {OrdinalPipe} from '../../shared/pipes/date.pipe'
@NgModule({

    declarations: [
        MultiEqualToValidator,
        OnlyNumber,
        ConfirmDialog,
        OrdinalPipe
    ],
    exports: [  OnlyNumber,
        MultiEqualToValidator,
        ConfirmDialog,
       SelectModule
     ]
})
export class SharedModule { }
