/*
 * Copyright (C) 2019 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { CommonModule } from '@angular/common';
import { DetailsGeschlechtModule } from './details-geschlecht.module';
import { DetailsGeburtsdatumModule } from './details-geburtsdatum.module';
import { DetailsNewsletterModule } from './details-newsletter.module';
import { DetailsUmsatzModule } from './details-umsatz.module';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsNachnameModule } from './details-nachname.module';
import { DetailsFamilienstandModule } from './details-familienstand.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsStammdatenComponent],
    exports: [DetailsStammdatenComponent],
    imports: [
        CommonModule,
        DetailsGeschlechtModule,
        DetailsGeburtsdatumModule,
        DetailsNewsletterModule,
        DetailsUmsatzModule,
        DetailsNachnameModule,
        DetailsFamilienstandModule,
    ],
})
export class DetailsStammdatenModule {}
