<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faChild } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'hs-home',
    template: `
        <div class="row d-flex justify-content-center align-self-center">
            <div class="col-md-5">
                <span>
                    <h2>
                        Willkommen in der Kundenverwaltung!
                    </h2>
                </span>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-self-center">
            <div class="col-md-6 offset-md-1">
                <fa-icon
                    class="offset-md-4"
                    [icon]="faChild"
                    size="8x"
                ></fa-icon>
            </div>
        </div>
        <router-outlet></router-outlet>
    `,
})
export class HomeComponent implements OnInit {
    readonly faChild = faChild;

    constructor(private readonly title: Title) {
        console.log('HomeComponent.constructor()');
    }

    ngOnInit() {
        this.title.setTitle('Kundenverwaltung');
    }
}
=======
/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'hs-home',
    template: `
        <h1 class="display-1 mt-4">Willkommen in der Kundenverwaltung!</h1>
        <router-outlet></router-outlet>
    `,
})
export class HomeComponent implements OnInit {
    constructor(private readonly title: Title) {
        console.log('HomeComponent.constructor()');
    }

    ngOnInit() {
        this.title.setTitle('Kundenverwaltung');
    }
}
>>>>>>> 1b74d64dea4661a1a26e7a510422a8824dad5a19
