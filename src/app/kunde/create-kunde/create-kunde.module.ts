import { CommonModule } from '@angular/common';
import { CreateEmailModule } from './create-email.module';
import { CreateUsernameModule } from './create-username.module';
import { CreatePasswordModule } from './create-password.module';
import { CreateOrtModule } from './create-ort.module';
import { CreatePlzModule } from './create-plz.module';
import { CreateFamilienstandModule } from './create-familienstand.module';
import { CreateGeburtsdatumModule } from './create-geburtsdatum.module';
import { CreateGeschlechtModule } from './create-geschlecht.module';
import { CreateInteressenModule } from './create-interessen.module';
import { CreateKundeComponent } from './create-kunde.component';
import { CreateNachnameModule } from './create-nachname.module';
import { CreateNewsletterModule } from './create-newsletter.module';
import { CreateBetragModule } from './create-betrag.module';
import { ErrorMessageModule } from '../../shared/error-message.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// KundeModule ist ein "FeatureModule", das Features fuer Kunden bereitstellt
@NgModule({
    declarations: [CreateKundeComponent],
    exports: [CreateKundeComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        CreateEmailModule,
        CreateUsernameModule,
        CreatePasswordModule,
        CreateOrtModule,
        CreatePlzModule,
        CreateGeschlechtModule,
        CreateGeburtsdatumModule,
        CreateNewsletterModule,
        CreateBetragModule,
        CreateInteressenModule,
        CreateNachnameModule,
        CreateFamilienstandModule,
        ErrorMessageModule,
    ],
    providers: [Title],
})
export class CreateKundeModule {}
