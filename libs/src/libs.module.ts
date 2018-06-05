import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { FlashCardComponent } from './components/flash-card/flash-card.component';
import { IntervalService } from './services/interval.service';
import { ChartAtPipe } from './pipes/chart-at.pipe';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        FlashCardComponent,
        ChartAtPipe,
    ],
    exports: [
        FlashCardComponent,
        ChartAtPipe,
    ]
})
export class MyLibModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MyLibModule,
            providers: [
                IntervalService
            ]
        };
    }
}
