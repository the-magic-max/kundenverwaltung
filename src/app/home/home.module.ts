import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [HomeComponent],
    imports: [HomeRoutingModule, FontAwesomeModule],

    // Der Singleton-Service "Title" wird benoetigt
    providers: [Title],
})
export class HomeModule {}
