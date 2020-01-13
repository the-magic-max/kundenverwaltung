import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-geburtsdatum&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-geburtsdatum',
    templateUrl: './create-geburtsdatum.component.html',
})
export class CreateGeburtsdatumComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly geburtsdatum = new FormControl(undefined);

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateGeburtsdatumComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('geburtsdatum', this.geburtsdatum);
    }
}
