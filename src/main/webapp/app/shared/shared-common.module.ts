import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import { WindowRef } from './tracker/window.service';
import {
    ResumeSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        ResumeSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        WindowRef,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        ResumeSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class ResumeSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
