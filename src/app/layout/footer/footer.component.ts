import { Component } from '@angular/core';
// eslint-disable-next-line sort-imports
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente f&uuml;r den Footer.
 */
@Component({
    selector: 'hs-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    readonly faEnvelope = faEnvelope;
    readonly faPhone = faPhone;
    constructor() {
        console.log('FooterComponent.constructor()');
    }
}
