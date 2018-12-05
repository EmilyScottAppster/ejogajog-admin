import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';
@Component({
  selector: 'app-spinner',
   styles: [`
		 [hidden] { display: none !important;}
		.loader{color:#fff}
		 
    `],
    template : `
    <div class="loader-overlay" [hidden]='!status'></div>
    <div class="loading" [hidden]="!status">
    
    <div class="loading-bar" ></div>
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
    </div>`,
  })
export class SpinnerComponent {
  public status: boolean = true;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.showLoader.subscribe(showLoader => {
        this.status = showLoader
    });
}
}
