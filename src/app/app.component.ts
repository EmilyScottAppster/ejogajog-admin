import { Component } from '@angular/core';
import { environment } from '../environments/environment';
//import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    environmentName = environment.envName;
    constructor() {
        
    }
}
