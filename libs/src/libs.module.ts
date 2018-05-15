import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class MyLibModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MyLibModule,
            providers: [
            ]
        };
    }
}
