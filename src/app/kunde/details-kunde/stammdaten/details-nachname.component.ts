<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-nachname</code>
 */
@Component({
    selector: 'hs-details-nachname',
    template: `
        <div class="row mt-2">
            <label class="col col-1"> Nachname </label>
            <div class="col col-11">{{ nachname }}</div>
        </div>
    `,
})
export class DetailsNachnameComponent implements OnInit {
    @Input()
    readonly nachname!: string;

    ngOnInit() {
        console.log(`DetailsNachnameComponent.nachname=${this.nachname}`);
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

import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-nachname</code>
 */
@Component({
    selector: 'hs-details-nachname',
    template: `
        <div class="row mt-2">
            <label class="col col-1"> Nachname </label>
            <div class="col col-11">{{ nachname }}</div>
        </div>
    `,
})
export class DetailsNachnameComponent implements OnInit {
    @Input()
    readonly nachname!: string;

    ngOnInit() {
        console.log(`DetailsNachnameComponent.nachname=${this.nachname}`);
    }
}
>>>>>>> 1b74d64dea4661a1a26e7a510422a8824dad5a19
