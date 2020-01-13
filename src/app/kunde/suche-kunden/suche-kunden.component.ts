import { Component, OnInit } from '@angular/core';
import { Suchkriterien } from '../shared/kunde.service';
import { Title } from '@angular/platform-browser';

/**
 * Komponente f&uuml;r das Tag <code>&lt;hs-suche-kunden&gt;</code>, die aus
 * den Kindkomponenten f&uuml;r diese Tags besteht:
 * <ul>
 *  <li> <code>hs-suchformular</code>
 *  <li> <code>hs-suchergebnis</code>
 * </ul>
 */
@Component({
    selector: 'hs-suche-kunden',
    template: `
        <hs-suchformular
            (suchkriterien)="setSuchkriterien($event)"
        ></hs-suchformular>
        <hs-suchergebnis [suchkriterien]="suchkriterien"></hs-suchergebnis>
    `,
})
export class SucheKundenComponent implements OnInit {
    suchkriterien!: Suchkriterien;

    // Wird von der JS-Engine aufgerufen
    constructor(private readonly titleService: Title) {
        console.log('SucheKundenComponent.constructor()');
    }

    // Wird von Angular aufgerufen, wenn der DOM-Baum fertig ist,
    // d.h. nach dem "Rendering".
    // Wird immer generiert, wenn Angular-CLI genutzt wird.
    ngOnInit() {
        this.titleService.setTitle('Suche');
    }

    /**
     * Das Attribut <code>suchkriterien</code> wird auf den Wert des Ereignisses
     * <code>$event</code> vom Typ Suchkriteriengesetzt. Diese Methode wird
     * aufgerufen, wenn in der Kindkomponente f&uuml;r
     * <code>hs-suchformular</code> das Ereignis ausgel&ouml;st wird.
     * Der aktuelle Wert vom Attribut <code>&lt;suchkriterien&gt;</code> an die
     * Kindkomponente f&uuml;r <code>&lt;suchergebnis&gt;</code> weitergereicht.
     * @param $event true f&uuml;r das Ausl&ouml;sen der Suche.
     */
    setSuchkriterien($event: Suchkriterien) {
        console.log(
            'SucheKundenComponent.setSuchkriterien(): suchkriterien=',
            $event,
        );
        this.suchkriterien = $event;
    }
}
