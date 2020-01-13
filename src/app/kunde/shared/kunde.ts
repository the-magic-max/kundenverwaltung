/* eslint-disable */
/* eslint-disable max-lines */

export enum KundeGeschlecht {
    WEIBLICH = 'W',
    MÄNNLICH = 'M',
    DIVERS = 'D',
}

export enum Interesse {
    SPORT = 'S',
    LESEN = 'L',
    REISEN = 'R',
}

export enum Familienstand {
    VERHEIRATET = 'VH',
    GESCHIEDEN = 'G',
    VERWITWET = 'VW',
    LEDIG = 'L',
}

export class Adresse {
    plz?: string;
    ort?: string;
    constructor(plz: string, ort: string) {
        this.plz = plz;
        this.ort = ort;
    }
}

export class Umsatz {
    betrag?: number;
    waehrung?: string;
    constructor(betrag: number, weahrung: string) {
        this.betrag = betrag;
        this.waehrung = weahrung;
    }
}

export class User {
    username?: string;
    password?: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export interface KundeShared {
    _id?: string;
    nachname?: string;
    email?: string;
    kategorie?: number;
    newsletter?: boolean;
    geburtsdatum?: Date;
    umsatz?: Umsatz;
    homepage?: string;
    geschlecht?: KundeGeschlecht;
    familienstand?: Familienstand | '';
    interessen?: Array<string>;
    adresse?: Adresse;
    user?: User;
    version?: number;
}

interface Link {
    href: string;
}

export interface KundeServer extends KundeShared {
    interessen?: Array<string>;
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

export interface KundeForm extends KundeShared {
    sport?: boolean;
    lesen?: boolean;
    reisen?: boolean;
}

/**
 * Model als Plain-Old-Sport-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export class Kunde {
    private static readonly SPACE = 2;

    // wird aufgerufen von fromServer() oder von fromForm()
    // eslint-disable-next-line max-params
    private constructor(
        public _id: string | undefined,
        public nachname: string,
        public email: string,
        public kategorie: number | undefined,
        public newsletter: boolean | undefined,
        public geburtsdatum: Date | undefined,
        public umsatz: Umsatz,
        public homepage: string | undefined,
        public geschlecht: KundeGeschlecht,
        public familienstand: Familienstand | undefined | '',
        public interessen: Array<string> | undefined,
        public adresse: Adresse | undefined,
        public user: User | undefined,
        public version: number | undefined,
    ) {
        // TODO Parsing, ob der Geburtsdatum-String valide ist
        this.geburtsdatum =
            geburtsdatum === undefined ? new Date() : new Date(geburtsdatum);
        this.interessen = interessen === undefined ? [] : interessen;
        console.log('Kunde(): this=', this);
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param kunde JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Kunde-Objekt
     */
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined;
        const { _links } = kundeServer;
        if (_links !== undefined) {
            const { self } = _links;
            selfLink = self.href;
        }
        let id: string | undefined;
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/');
            id = selfLink.substring(lastSlash + 1);
        }

        let version: number | undefined;
        if (etag !== undefined) {
            // Anfuehrungszeichen am Anfang und am Ende entfernen
            const versionStr = etag.substring(1, etag.length - 1);
            version = Number.parseInt(versionStr, 10);
        }

        let beispielAdresse = new Adresse('76772', 'Durlach');
        let beispielUmsatz = new Umsatz(20.0, 'EUR');
        let beispielUser = new User('dolly', 'p');

        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.kategorie,
            kundeServer.newsletter,
            kundeServer.geburtsdatum,
            beispielUmsatz,
            kundeServer.homepage,
            kundeServer.geschlecht,
            kundeServer.familienstand,
            kundeServer.interessen,
            beispielAdresse,
            beispielUser,
            version,
        );
        console.log('Kunde.fromServer(): kunde=', kunde);
        return kunde;
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param kunde JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Kunde-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        console.log('Kunde.fromForm(): kundeForm=', kundeForm);
        const interessen: Array<string> = [];
        if (kundeForm.sport === true) {
            interessen.push('S');
        }
        if (kundeForm.lesen === true) {
            interessen.push('L');
        }
        if (kundeForm.reisen === true) {
            interessen.push('R');
        }

        const kunde = new Kunde(
            kundeForm._id,
            kundeForm.nachname,
            kundeForm.email,
            kundeForm.kategorie,
            kundeForm.newsletter,
            kundeForm.geburtsdatum,
            kundeForm.umsatz,
            kundeForm.homepage,
            kundeForm.geschlecht,
            kundeForm.familienstand,
            kundeForm.interessen,
            kundeForm.adresse,
            kundeForm.user,
            kundeForm.version,
        );
        console.log('Kunde.fromForm(): kunde=', kunde);
        return kunde;
    }

    // Property in TypeScript wie in C#
    // https://www.typescriptlang.org/docs/handbook/classes.html#accessors
    get datumFormatted() {
        // z.B. 7. Mai 2020
        const formatter = new Intl.DateTimeFormat('de', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return this.geburtsdatum === undefined
            ? ''
            : formatter.format(this.geburtsdatum);
    }

    /**
     * Abfrage, ob im Kundenachname der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param nachname Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Kundenachname enthalten ist. Sonst
     *         false.
     */
    containsNachname(nachname: string) {
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase());
    }

    /**
     * Abfrage, ob das Kunde dem angegebenen Familienstand zugeordnet ist.
     * @param familienstand der Name des Familienstands
     * @return true, falls das Kunde dem Familienstand zugeordnet ist. Sonst false.
     */
    hasFamilienstand(familienstand: string) {
        return this.familienstand === familienstand;
    }

    /**
     * Aktualisierung der Stammdaten des Kunde-Objekts.
     * @param nachname Der neue Kundenachname
     * @param rating Die neue Bewertung
     * @param geschlecht Die neue Kundeart (M oder W)
     * @param familienstand Der neue Familienstand
     * @param umsatz Der neue Umsatz
     * @param rabatt Der neue Rabatt
     */
    // eslint-disable-next-line max-params
    updateStammdaten(
        nachname: string,
        geschlecht: KundeGeschlecht,
        familienstand: Familienstand | undefined | '',
        kategorie: number | undefined,
        geburtsdatum: Date | undefined,
        umsatz: Umsatz,
    ) {
        this.nachname = nachname;
        this.geschlecht = geschlecht;
        this.familienstand = familienstand;
        this.geburtsdatum =
            geburtsdatum === undefined ? new Date() : geburtsdatum;
        this.kategorie = kategorie;
        this.umsatz = umsatz;
    }

    /**
     * Abfrage, ob es zum Kunde auch Schlagw&ouml;rter gibt.
     * @return true, falls es mindestens ein Interesse gibt. Sonst false.
     */
    hasInteressen() {
        if (this.interessen === undefined) {
            return false;
        }
        return this.interessen.length !== 0;
    }

    /**
     * Abfrage, ob es zum Kunde das angegebene Interesse gibt.
     * @param interesse das zu &uuml;berpr&uuml;fende Interesse
     * @return true, falls es das Interesse gibt. Sonst false.
     */
    hasInteresse(interesse: string) {
        if (this.interessen === undefined) {
            return false;
        }
        return this.interessen.includes(interesse);
    }

    /**
     * Aktualisierung der Schlagw&ouml;rter des Kunde-Objekts.
     * @param sport ist das Interesse S gesetzt
     * @param lesen ist das Interesse L gesetzt
     * @param reisen ist das Interesse R gesetzt
     */
    updateInteressen(sport: boolean, lesen: boolean, reisen: boolean) {
        this.resetInteressen();
        if (sport) {
            this.addInteresse('S');
        }
        if (lesen) {
            this.addInteresse('L');
        }
        if (reisen) {
            this.addInteresse('R');
        }
    }

    /**
     * Konvertierung des Kundeobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
    toJSON(): KundeServer {
        const geburtsdatum =
            this.geburtsdatum === undefined
                ? undefined
                : this.geburtsdatum.toISOString();
        console.log(`toJson(): geburtsdatum=${geburtsdatum}`);
        return {
            _id: this._id,
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            newsletter: this.newsletter,
            geburtsdatum: this.geburtsdatum,
            umsatz: this.umsatz,
            homepage: this.homepage,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            interessen: this.interessen,
            adresse: this.adresse,
            user: this.user,
        };
    }

    toString() {
        return JSON.stringify(this, null, Kunde.SPACE);
    }

    private resetInteressen() {
        this.interessen = [];
    }

    private addInteresse(interesse: string) {
        if (this.interessen === undefined) {
            this.interessen = [];
        }
        this.interessen.push(interesse);
    }
}
