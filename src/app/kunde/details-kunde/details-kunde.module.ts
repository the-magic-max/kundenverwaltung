import { CommonModule } from '@angular/common';
import { DetailsBearbeitenModule } from './details-bearbeiten.module';
import { DetailsBreadcrumbsModule } from './details-breadcrumbs.module';
import { DetailsInteressenModule } from './interessen/details-interessen.module';
import { DetailsKundeComponent } from './details-kunde.component';
import { DetailsStammdatenModule } from './stammdaten/details-stammdaten.module';
import { ErrorMessageModule } from '../../shared/error-message.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WaitingModule } from '../../shared/waiting.module';

@NgModule({
    declarations: [DetailsKundeComponent],
    exports: [DetailsKundeComponent],
    providers: [Title],
    imports: [
        CommonModule,
        HttpClientModule,
        ErrorMessageModule,
        WaitingModule,
        DetailsBearbeitenModule,
        DetailsBreadcrumbsModule,
        DetailsInteressenModule,
        DetailsStammdatenModule,
    ],
})
export class DetailsKundeModule {}
