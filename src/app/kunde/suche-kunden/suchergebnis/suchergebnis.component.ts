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

/* eslint-disable max-classes-per-file */

// Bereitgestellt durch das RouterModule
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { HttpStatus, easeIn, easeOut } from '../../../shared';
import { KundeService, Suchkriterien } from '../../shared/kunde.service';
import {
    faFolderOpen,
    faInfoCircle,
    faSearchPlus,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../auth/auth.service';
import { Kunde } from '../../shared/kunde';
import { NgLocalization } from '@angular/common';
import { Subscription } from 'rxjs';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchergebnis</code>, um zun&auml;chst
 * das Warten und danach das Ergebnis der Suche anzuzeigen, d.h. die gefundenen
 * B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-suchergebnis',
    templateUrl: './suchergebnis.component.html',
    animations: [easeIn, easeOut],
})
export class SuchergebnisComponent implements OnChanges, OnInit, OnDestroy {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek, wie z.B. Redux http://redux.js.org

    // Property Binding: <hs-suchergebnis [waiting]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    suchkriterien: Suchkriterien | undefined;

    waiting = false;

    kunden: Array<Kunde> = [];
    errorMsg: string | undefined;
    isAdmin!: boolean;

    readonly faFolderOpen = faFolderOpen;
    readonly faInfoCircle = faInfoCircle;
    readonly faSearchPlus = faSearchPlus;
    readonly faTrash = faTrash;

    private kundenSubscription!: Subscription;
    private errorSubscription!: Subscription;
    private removeDescription: Subscription | undefined;

    // Empfehlung: Konstruktor nur fuer DI
    // eslint-disable-next-line max-params
    constructor(
        private readonly kundeService: KundeService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly authService: AuthService,
    ) {
        console.log('SuchergebnisComponent.constructor()');
    }

    ngOnChanges() {
        if (this.suchkriterien === undefined) {
            return;
        }

        this.waiting = true;
        this.kundeService.find(this.suchkriterien);
    }

    // Attribute mit @Input() sind undefined im Konstruktor.
    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen. Entspricht @PostConstruct bei Java.
    // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
    // https://angular.io/docs/ts/latest/guide/cheatsheet.html
    // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtet
    // IntelliSense bei der Verwendung von TypeScript.
    ngOnInit() {
        this.kundenSubscription = this.subscribeKunden();
        this.errorSubscription = this.subscribeError();
        this.isAdmin = this.authService.isAdmin;
    }

    ngOnDestroy() {
        this.kundenSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();

        if (this.removeDescription !== undefined) {
            this.removeDescription.unsubscribe();
        }
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde in der Detailsseite anzeigen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    onSelect(kunde: Kunde) {
        console.log('SuchergebnisComponent.onSelect(): kunde=', kunde);
        // TODO: NavigationExtras beim Routing
        // https://github.com/angular/angular/pull/27198
        // https://github.com/angular/angular/commit/67f4a5d4bd3e8e6a35d85500d630d94db061900b
        /* eslint-disable object-curly-newline */
        return this.router.navigate(['..', kunde._id], {
            relativeTo: this.route,
        });
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde l&ouml;schen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    onRemove(kunde: Kunde) {
        console.log('SuchergebnisComponent.onRemove(): kunde=', kunde);
        const successFn: (() => void) | undefined = undefined;
        const errorFn = (status: number) =>
            console.error(`Fehler beim Loeschen: status=${status}`);
        this.removeDescription = this.kundeService.remove(
            kunde,
            successFn,
            errorFn,
        );
        if (this.kunden.length > 0) {
            this.kunden = this.kunden.filter((b: Kunde) => b._id !== kunde._id);
        }
    }

    /**
     * Methode, um den injizierten <code>KundeService</code> zu beobachten,
     * ob es gefundene bzw. darzustellende B&uuml;cher gibt, die in der
     * Kindkomponente f&uuml;r das Tag <code>gefundene-kunden</code>
     * dargestellt werden. Diese private Methode wird in der Methode
     * <code>ngOnInit</code> aufgerufen.
     */
    private subscribeKunden() {
        const next = (kunden: Array<Kunde>) => {
            this.reset();
            this.errorMsg = undefined;

            this.kunden = kunden;
            console.log(
                'SuchErgebnisComponent.subscribeKunden: this.kunden=',
                this.kunden,
            );
        };

        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request auch abbrechen ("cancel") kann
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
        return this.kundeService.kundenSubject.subscribe(next);
    }

    /**
     * Methode, um den injizierten <code>KundeService</code> zu beobachten,
     * ob es bei der Suche Fehler gibt, die in der Kindkomponente f&uuml;r das
     * Tag <code>error-message</code> dargestellt werden. Diese private Methode
     * wird in der Methode <code>ngOnInit</code> aufgerufen.
     */
    private subscribeError() {
        const next = (err: string | number | undefined) => {
            this.reset();
            this.kunden = [];

            console.log('SuchErgebnisComponent.subscribeError: err=', err);
            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.';
                return;
            }

            if (typeof err === 'string') {
                this.errorMsg = err;
                return;
            }

            switch (err) {
                case HttpStatus.NOT_FOUND:
                    this.errorMsg = 'Keine Kunden gefunden.';
                    break;
                default:
                    this.errorMsg = 'Ein Fehler ist aufgetreten.';
                    break;
            }
            console.log(`SuchErgebnisComponent.errorMsg: ${this.errorMsg}`);
        };

        return this.kundeService.errorSubject.subscribe(next);
    }

    private reset() {
        this.suchkriterien = {
            nachname: '',
            email: '',
            geschlecht: '',
            interessen: { sport: false, lesen: false, reisen: false },
        };
        this.waiting = false;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi'; // eslint-disable-line no-magic-numbers
    }
}
