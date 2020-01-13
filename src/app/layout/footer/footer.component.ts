/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Component } from '@angular/core';
// eslint-disable-next-line sort-imports
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faLink,
} from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line prettier/prettier
import {
    faFacebook,
    faForumbee,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
    readonly faMapMarkerAlt = faMapMarkerAlt;
    readonly faLink = faLink;
    readonly faFacebook = faFacebook as IconProp;
    readonly faLinkedin = faLinkedin as IconProp;
    readonly faForumbee = faForumbee as IconProp;

    constructor() {
        console.log('FooterComponent.constructor()');
    }
}
