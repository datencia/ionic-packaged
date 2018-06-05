import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IntervalService } from '@my/lib';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    value$: Observable<string>;

    constructor(
        private intervalSrv: IntervalService,
    ) { }

    ngOnInit() {
        this.value$ = this.intervalSrv.value;
    }

}
