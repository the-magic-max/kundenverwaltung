import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-betrag</code>
 */
@Component({
    selector: 'hs-details-betrag',
    templateUrl: './details-betrag.component.html',
})
export class DetailsBetragComponent implements OnInit {
    @Input()
    readonly betrag!: number | '';

    ngOnInit() {
        console.log(`DetailsBetragComponent.betrag=${this.betrag}`);
    }
}
