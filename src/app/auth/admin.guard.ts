import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// https://angular.io/guide/router#can-activate-guard
// https://angular.io/api/router/CanActivate
// https://blog.angularindepth.com/new-in-angular-v7-1-updates-to-the-router-fd67d526ad05

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        console.log('AdminGuard.constructor()');
    }

    canActivate(
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.authService.isAdmin) {
            console.log('AdminGuard.canActivate(): admin');
            return true;
        }

        console.log('isAdmin: ', this.authService.isAdmin);

        console.warn('AdminGuard.canActivate(): nicht "admin"');
        // Navigation wird abgebrochen ("cancelled") und zum neuen Pfad umgeleitet
        return this.router.createUrlTree(['/']);
    }
}
