import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hs-details-kategorie',
    template: `
        <div class="row mt-2">
            <label class="col col-1"> Kategorie </label>
            <div class="col col-11">{{ kategorie }}</div>
        </div>
    `,
})
export class DetailsKategorieComponent implements OnInit {
    @Input()
    readonly kategorie!: string;

    ngOnInit() {
        console.log(`DetailsKategorieComponent.kategorie=${this.kategorie}`);
    }
}
