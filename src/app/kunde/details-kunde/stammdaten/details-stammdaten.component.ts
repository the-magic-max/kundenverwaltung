<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { Kunde } from '../../shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <hs-details-stammdaten [kunde]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunde!: Kunde;

    ngOnInit() {
        console.log('DetailsStammdatenComponent.kunde=', this.kunde);
    }
}
=======
import { Component, Input, OnInit } from '@angular/core';
import { Kunde } from '../../shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <hs-details-stammdaten [kunde]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunde!: Kunde;

    ngOnInit() {
        console.log('DetailsStammdatenComponent.kunde=', this.kunde);
    }
}
>>>>>>> 1b74d64dea4661a1a26e7a510422a8824dad5a19
