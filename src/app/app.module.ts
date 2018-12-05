import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions, RequestOptionsArgs, Response, HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InterceptorService, Interceptor } from 'ng2-interceptors';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SpinnerService } from './shared/services/spinner.service';
import { SpinnerComponent } from './shared/services/spinner/spinner.component';
import { UserService } from './shared/services/user.services';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServerURLInterceptor } from './interceptors/serverurlinterceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AnonymousNavigationGuard } from './shared/guard/auth.guard.anonymousNavigation';
export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, serverURLInterceptor: ServerURLInterceptor) {
    // Add it here
    const service = new InterceptorService(xhrBackend, requestOptions);
    service.addInterceptor(serverURLInterceptor); // Add it here
    return service;
}

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        FlashMessagesModule,
        TranslateModule.forRoot(),
        ModalModule.forRoot()
    ],
    providers: [ ServerURLInterceptor,
        {
            provide: InterceptorService,
            useFactory: interceptorFactory,
            deps: [XHRBackend, RequestOptions, ServerURLInterceptor]
            // Add it here, in the same order as the signature of interceptorFactory
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        AuthGuard, SpinnerService, UserService, AnonymousNavigationGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
