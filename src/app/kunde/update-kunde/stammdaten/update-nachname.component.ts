import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-nachname</code>
 */
@Component({
    selector: 'hs-update-nachname',
    templateUrl: './update-nachname.component.html',
})
export class UpdateNachnameComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    // <hs-update-nachname [form]="form" [currentValue]="...">
    @Input()
    readonly form!: FormGroup;
    @Input()
    readonly currentValue!: string;

    nachname!: FormControl;

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log(
            'UpdateNachnameComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.nachname = new FormControl(
            this.currentValue,
            Validators.compose([
                Validators.required,
                Validators.minLength(UpdateNachnameComponent.MIN_LENGTH),
                Validators.pattern(/^\w.*$/u),
            ]),
        );
        this.form.addControl('nachname', this.nachname);
    }
}
