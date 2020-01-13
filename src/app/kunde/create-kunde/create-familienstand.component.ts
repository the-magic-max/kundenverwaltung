<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-familienstand&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-familienstand',
    templateUrl: './create-familienstand.component.html',
})
export class CreateFamilienstandComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly familienstand = new FormControl(undefined, Validators.required);

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateFamilienstandComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('familienstand', this.familienstand);
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-familienstand&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-familienstand',
    templateUrl: './create-familienstand.component.html',
})
export class CreateFamilienstandComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly familienstand = new FormControl(undefined, Validators.required);

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateFamilienstandComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('familienstand', this.familienstand);
    }
}
>>>>>>> 1b74d64dea4661a1a26e7a510422a8824dad5a19
