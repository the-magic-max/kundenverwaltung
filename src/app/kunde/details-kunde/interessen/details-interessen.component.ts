<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-interessen</code>
 */
@Component({
    selector: 'hs-details-interessen',
    templateUrl: 'details-interessen.component.html',
})
export class DetailsInteressenComponent implements OnInit {
    // <hs-interessen [values]="kunde.interessen">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    readonly values!: Array<string>;

    ngOnInit() {
        console.log('DetailsInteressenComponent.values=', this.values);
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
 * Komponente f&uuml;r das Tag <code>hs-details-interessen</code>
 */
@Component({
    selector: 'hs-details-interessen',
    templateUrl: 'details-interessen.component.html',
})
export class DetailsInteressenComponent implements OnInit {
    // <hs-interessen [values]="kunde.interessen">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    readonly values!: Array<string>;

    ngOnInit() {
        console.log('DetailsInteressenComponent.values=', this.values);
    }
}
>>>>>>> 1b74d64dea4661a1a26e7a510422a8824dad5a19
