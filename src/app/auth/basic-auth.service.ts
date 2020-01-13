import { BASE_URI, HttpStatus } from '../shared';
import { CookieService } from './cookie.service';
import { Injectable } from '@angular/core';

enum Rolle {
    ROLE_ADMIN,
    ROLE_KUNDE,
    ROLE_MITARBEITER,
}

export interface Identity {
    username: string;
    rollen: Array<Rolle>;
    password?: string;
}

@Injectable({ providedIn: 'root' })
export class BasicAuthService {
    constructor(private readonly cookieService: CookieService) {
        console.log('BasicAuthService.constructor()');
    }

    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    async login(username: string | undefined, password: string | undefined) {
        console.log(
            `BasicAuthService.login(): username=${username}, password=${password}`,
        );
        const loginUri = `${BASE_URI}/rest/auth/rollen`;
        console.log(`BasicAuthService.login(): loginUri=${loginUri}`);

        const base64 = window.btoa(`${username}:${password}`);
        const basicAuth = `Basic ${base64}`;

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const headers = new Headers();
        headers.append('Authorization', basicAuth);
        const request = new Request(loginUri, {
            method: 'GET',
            headers,
        });

        let response: Response | undefined;
        try {
            response = await fetch(request);
            // Optional catch binding parameters
        } catch {
            console.error(
                'BasicAuthService.login(): Kommunikationsfehler mit d. Appserver',
            );
            return Promise.reject(
                new Error('Kommunikationsfehler mit dem Appserver'),
            );
        }

        const { status } = response;
        console.log(`BasicAuthService.login(): status=${status}`);
        if (status !== HttpStatus.OK) {
            return Promise.reject(new Error(response.statusText));
        }

        const json = await response.json();
        console.log('BasicAuthService.login(): json', json);
        // Array von Strings als 1 String
        const roles: string = json.join();
        console.log(`BasicAuthService.login(): roles=${roles}`);

        this.cookieService.saveAuthorization(
            // Base64-String fuer 1 Tag speichern
            basicAuth,
            roles,
        );
        return roles;
    }
}
