import { Component, Input, OnInit } from '@angular/core';
import { Adresse } from '../../shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-adresse</code>
 */
@Component({
    selector: 'hs-details-adresse',
    template: `
        <div class="row mt-2">
            <label class="col col-2"> Adresse </label>
            <div class="col col-10">{{ adresse.ort }}</div>
            <label class="col col-2"></label>
            <div class="col col-10">{{ adresse.plz }}</div>
        </div>
    `,
})
export class DetailsAdresseComponent implements OnInit {
    @Input()
    readonly adresse!: Adresse;

    ngOnInit() {
        console.log(`DetailsAdresseComponent.email=${this.adresse}`);
    }
}
