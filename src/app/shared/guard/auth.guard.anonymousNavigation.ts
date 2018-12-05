import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AnonymousNavigationGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (sessionStorage.getItem('LoggedInUser')) {
            return true;
        } else {
            return false;
        }
    }
}
