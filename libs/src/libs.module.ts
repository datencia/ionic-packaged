import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { FlashCardComponent } from './components/flash-card/flash-card.component';
import { IntervalService } from './services/interval.service';
import { ChartAtPipe } from './pipes/chart-at.pipe';
import { AboutPage } from './pages/about/about.page';
import { ContactPage } from './pages/contact/contact.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        FlashCardComponent,
        ChartAtPipe,
        AboutPage,
        ContactPage,
    ],
    entryComponents: [
        AboutPage,
        ContactPage,
    ],
    exports: [
        FlashCardComponent,
        ChartAtPipe,
        AboutPage,
        ContactPage,
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
