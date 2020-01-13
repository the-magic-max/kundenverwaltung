import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { KundeGeschlecht } from '../../shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-geschlecht</code>
 */
@Component({
    selector: 'hs-update-geschlecht',
    templateUrl: './update-geschlecht.component.html',
})
export class UpdateGeschlechtComponent implements OnInit {
    // <hs-update-geschlecht [form]="form" [currentValue]="...">
    @Input()
    readonly form!: FormGroup;
    @Input()
    readonly currentValue!: KundeGeschlecht;

    geschlecht!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateGeschlechtComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.geschlecht = new FormControl(
            this.currentValue,
            Validators.required,
        );
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
