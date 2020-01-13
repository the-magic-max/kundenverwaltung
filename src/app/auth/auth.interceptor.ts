import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {} // eslint-disable-line no-empty-function,no-useless-constructor

    intercept(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: HttpRequest<any>,
        next: HttpHandler,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Observable<HttpEvent<any>> {
        const authorizationStr = `${this.authService.authorization}`;
        console.log(`authorizationStr=${authorizationStr}`);
        const requestWithAuthorization = request.clone({
            setHeaders: { Authorization: authorizationStr },
        });
        return next.handle(requestWithAuthorization);
    }
}

// https://angular.io/guide/http#intercepting-requests-and-responses
// https://next.angular.io/guide/http#intercepting-requests-and-responses
export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
];
