import { BasicAuthService } from './basic-auth.service';
import { CookieService } from './cookie.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// export const ROLLE_ADMIN = 'admin';
// Spring Security:
export const ROLLE_ADMIN = 'ROLE_ADMIN';

@Injectable({ providedIn: 'root' })
export class AuthService {
    // Subject statt Observable:
    // in login() und logout() wird Subject.next() aufgerufen
    /* eslint-disable no-underscore-dangle */
    private readonly _isLoggedInSubject = new Subject<boolean>();
    private readonly _rollenSubject = new Subject<Array<string>>();

    constructor(
        private readonly cookieService: CookieService,
        private readonly basicAuthService: BasicAuthService,
    ) {
        console.log('AuthService.constructor()');
    }

    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    async login(username: string | undefined, password: string | undefined) {
        console.log(
            `AuthService.login(): username=${username}, password=${password}`,
        );
        let rollen: Array<string> = [];
        try {
            const rollenString = await this.basicAuthService.login(
                username,
                password,
            );
            console.log(
                'AuthService.login(): Rollen als String: ',
                rollenString,
            );
            rollen = rollenString.split(',');
            console.log('AuthService.login()', rollen);
            this.isLoggedInSubject.next(true);
        } catch (e) {
            console.warn('AuthService.login(): Exception', e);
            this.isLoggedInSubject.next(false);
        }

        this.rollenSubject.next(rollen);
    }

    /**
     * @return void
     */
    logout() {
        console.warn('AuthService.logout()');
        this.cookieService.deleteAuthorization();
        this.isLoggedInSubject.next(false);
        this.rollenSubject.next([]);
    }

    get isLoggedInSubject() {
        return this._isLoggedInSubject;
    }
    get rollenSubject() {
        return this._rollenSubject;
    }

    /**
     * @return String fuer JWT oder Basic-Authentifizierung
     */
    get authorization() {
        return this.cookieService.getAuthorization();
    }

    /**
     * @return true, falls ein User eingeloggt ist; sonst false.
     */
    get isLoggedIn() {
        return this.cookieService.getAuthorization() !== undefined;
    }

    /**
     * @return true, falls ein User in der Rolle "admin" eingeloggt ist;
     *         sonst false.
     */
    get isAdmin() {
        // z.B. 'admin,mitarbeiter'
        const rolesStr = this.cookieService.getRoles();
        if (rolesStr === undefined) {
            return false;
        }

        // z.B. ['admin', 'mitarbeiter']
        const rolesArray = rolesStr.split(',');
        console.log(rolesArray.toString());
        return rolesArray !== undefined && rolesArray.includes(ROLLE_ADMIN);
    }
}
