import { Component } from '@angular/core';

@Component({
    selector: 'flash-card',
    templateUrl: './flash-card.component.html',
    styleUrls: [
        './flash-card.component.scss'
    ]
})
export class FlashCardComponent {

    flipped: boolean = false;

    constructor() {

    }

    flip() {
        this.flipped = !this.flipped;
    }

}
