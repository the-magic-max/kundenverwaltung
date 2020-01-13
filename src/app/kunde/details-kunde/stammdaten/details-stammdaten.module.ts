import { CommonModule } from '@angular/common';
import { DetailsAdresseModule } from './details-adresse.module';
import { DetailsEmailModule } from './details-email.module';
import { DetailsFamilienstandModule } from './details-familienstand.module';
import { DetailsGeburtsdatumModule } from './details-geburtsdatum.module';
import { DetailsGeschlechtModule } from './details-geschlecht.module';
import { DetailsHomepageModule } from './details-homepage.module';
import { DetailsKategorieModule } from './details-kategorie.module';
import { DetailsNachnameModule } from './details-nachname.module';
import { DetailsNewsletterModule } from './details-newsletter.module';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsBetragModule } from './details-betrag.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsStammdatenComponent],
    exports: [DetailsStammdatenComponent],
    imports: [
        CommonModule,
        DetailsAdresseModule,
        DetailsEmailModule,
        DetailsHomepageModule,
        DetailsKategorieModule,
        DetailsGeschlechtModule,
        DetailsGeburtsdatumModule,
        DetailsNewsletterModule,
        DetailsBetragModule,
        DetailsNachnameModule,
        DetailsFamilienstandModule,
    ],
})
export class DetailsStammdatenModule {}
