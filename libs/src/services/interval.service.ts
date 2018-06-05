import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Injectable()
export class IntervalService {

    get value(): Observable<string> {
        return interval(1000).pipe(map(val => `${val}`));
    }

}
