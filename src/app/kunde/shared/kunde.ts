import 'moment/locale/de'
import * as moment from 'moment'

moment.locale('de')

export enum Interesse {
    SPORT = 'S',
    LESEN = 'L',
    REISEN = 'R',
}

export enum Geschlecht {
    MÄNNLICH = 'M',
    WEIBLICH = 'W',
}

export enum Familienstand {
    VERHEIRATET = 'VH',
    GESCHIEDEN = 'G',
    VERWITWET = 'VW',
    LEDIG = 'L',
}

export class Adresse {
    plz?: string
    ort?: string
    constructor(plz: string, ort: string) {
        this.plz = plz
        this.ort = ort
    }
}

export class User {
    username?: string
    password?: string
    constructor(username: string, password: string) {
        this.password = password
        this.username = username
    }
}

export class Umsatz {
    betrag?: number
    waehrung?: string
    constructor(betrag: number, weahrung: string) {
        this.betrag = betrag
        this.waehrung = weahrung
    }
}
type UUID = string
/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Kundedaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface KundeShared {
    _id?: UUID
    nachname?: string
    email?: string
    kategorie?: number
    newsletter?: boolean
    geburtsdatum?: Date
    umsatz?: Umsatz
    homepage?: string
    geschlecht?: Geschlecht
    familienstand?: Familienstand
    //Dürfen die Interessen da drin stehen ?
    interessen?: Array<string>
    adresse?: Adresse
    version?: number
    user?: User
}

interface Link {
    rel: string
    href: string
}

export interface KundeServer extends KundeShared {
    interessen?: Array<string>
    links?: Array<Link>
}

export interface KundeForm extends KundeShared {
    sport?: boolean
    lesen?: boolean
    reisen?: boolean
}

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export class Kunde {
    private constructor(
        // tslint:disable-next-line:variable-name
        public _id: UUID | undefined,
        public nachname: string | undefined,
        public email: string | undefined,
        public kategorie: number | undefined,
        public newsletter: boolean | undefined,
        public geburtsdatum: Date | undefined,
        public umsatz: Umsatz | undefined,
        public homepage: string | undefined,
        public geschlecht: Geschlecht | undefined,
        public familienstand: Familienstand | undefined,
        public interessen: Array<string> | undefined,
        public adresse: Adresse | undefined,
        public version: number | undefined,
        public user: User | undefined,
    ) {
        this.interessen =
            interessen === undefined ? [] : (this.interessen = interessen)
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param kunde JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Kunde-Objekt
     */
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined
        const selfLinkJson = kundeServer.links && kundeServer.links[0]
        if (selfLinkJson !== undefined && selfLinkJson.rel === 'self') {
            selfLink = selfLinkJson.href
        }
        let id: UUID | undefined
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/')
            id = selfLink.substring(lastSlash + 1)
        }

        let version: number | undefined
        if (etag !== undefined) {
            // Anfuehrungszeichen am Anfang und am Ende entfernen
            const versionStr = etag.substring(1, etag.length - 1)
            version = Number.parseInt(versionStr, 10)
        }

        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.kategorie,
            kundeServer.newsletter,
            kundeServer.geburtsdatum,
            kundeServer.umsatz,
            kundeServer.homepage,
            kundeServer.geschlecht,
            kundeServer.familienstand,
            kundeServer.interessen,
            kundeServer.adresse,
            version,
            kundeServer.user,
        )
        console.log('Kunde.fromServer(): kunde=', kunde)
        return kunde
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param kunde JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Kunde-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        const interessen: Array<string> = []
        if (kundeForm.lesen === true) {
            interessen.push('L')
        }
        if (kundeForm.reisen === true) {
            interessen.push('R')
        }
        if (kundeForm.sport === true) {
            interessen.push('S')
        }

        let eineAdresse = new Adresse('77777', 'Karlsbad')
        let einUmsatz = new Umsatz(20.0, 'EUR')
        let user = new User('daria', 'password')

        const kunde = new Kunde(
            kundeForm._id,
            kundeForm.nachname,
            kundeForm.email,
            kundeForm.kategorie,
            kundeForm.newsletter,
            kundeForm.geburtsdatum,
            einUmsatz,
            kundeForm.homepage,
            kundeForm.geschlecht,
            kundeForm.familienstand,
            interessen,
            eineAdresse,
            kundeForm.version,
            user,
        )
        console.log('Kunde.fromForm(): kunde=', kunde)
        return kunde
    }

    /**
     * Abfrage, ob im Kundetitel der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param nachname Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Kundetitel enthalten ist. Sonst
     *         false.
     */
    containsNachname(nachname: string) {
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase())
    }

    /**
     * Abfrage, ob es zum Kunde auch Interessen gibt.
     * @return true, falls es mindestens eine Interesse gibt. Sonst false.
     */

    /**
     * Aktualisierung der Stammdaten des Kunden-Objekts.
     * @param nachname
     * @param familienstand
     * @param email
     * @param homepage
     * @param kategorie
     * @param newsletter
     */
    // eslint-disable-next-line max-params
    updateStammdaten(
        nachname: string,
        familienstand: Familienstand,
        email: string,
        homepage: string,
        kategorie: number | undefined,
        newsletter: boolean,
    ) {
        this.nachname = nachname
        this.familienstand = familienstand
        this.email = email
        this.homepage = homepage
        this.kategorie = kategorie
        this.newsletter = newsletter
    }

    hasInteressen() {
        if (this.interessen === undefined || this.interessen === null) {
            return false
        }
        return this.interessen.length !== 0
    }
    /**
     * Abfrage, ob es zum Kunde die angegebene Interesse gibt.
     * @param interesse die zu überprüf. Interesse
     * @return true, falls es die Interesse gibt. Sonst false.
     */
    hasInteresse(interesse: string) {
        if (this.interessen === undefined) {
            return false
        }
        return this.interessen.includes(interesse)
    }

    /**
     * Aktualisierung der Interessen des Kunde-Objekts.
     * @param lesen ist das Schlagwort LESEN gesetzt
     * @param reisen ist das Schlagwort REISEN gesetzt
     * @param sport ist das Schlagwort SPORT gesetzt
     */
    // updateSchlagwoerter

    /**
     * Konvertierung des Kundeobjektes in ein JSON-Objekt für den RESTful
     * Web Service.
     * @return Das JSON-Objekt für den RESTful Web Service
     */
    toJSON(): KundeServer {
        // const datum =
        //     this.datum === undefined
        //         ? undefined
        //         : this.datum.format('YYYY-MM-DD')
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
        }
    }

    updateInteressen(reisen: boolean, lesen: boolean, sport: boolean) {
        this.resetInteressen()
        if (reisen) {
            this.addInteresse('REISEN')
        }
        if (sport) {
            this.addInteresse('SPORT')
        }
        if (lesen) {
            this.addInteresse('LESEN')
        }
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }

    private resetInteressen() {
        this.interessen = []
    }

    private addInteresse(interesse: string) {
        if (this.interessen === undefined) {
            this.interessen = []
        }
        this.interessen.push(interesse)
    }
}
