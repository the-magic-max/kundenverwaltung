/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { CreateKundeModule } from './create-kunde/create-kunde.module';
import { DetailsKundeModule } from './details-kunde/details-kunde.module';
import { KundeRoutingModule } from './kunde-routing.module';
import { NgModule } from '@angular/core';
import { SucheKundenModule } from './suche-kunden/suche-kunden.module';
import { UpdateKundeModule } from './update-kunde/update-kunde.module';

@NgModule({
    imports: [
        CreateKundeModule,
        DetailsKundeModule,
        SucheKundenModule,
        UpdateKundeModule,
        KundeRoutingModule,
    ],
})
export class KundeModule {}
