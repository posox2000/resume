import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResumeSharedModule } from '../../shared';
import {
    WorkhistoryService,
    WorkhistoryPopupService,
    WorkhistoryComponent,
    WorkhistoryDetailComponent,
    WorkhistoryDialogComponent,
    WorkhistoryPopupComponent,
    WorkhistoryDeletePopupComponent,
    WorkhistoryDeleteDialogComponent,
    workhistoryRoute,
    workhistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...workhistoryRoute,
    ...workhistoryPopupRoute,
];

@NgModule({
    imports: [
        ResumeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WorkhistoryComponent,
        WorkhistoryDetailComponent,
        WorkhistoryDialogComponent,
        WorkhistoryDeleteDialogComponent,
        WorkhistoryPopupComponent,
        WorkhistoryDeletePopupComponent,
    ],
    entryComponents: [
        WorkhistoryComponent,
        WorkhistoryDialogComponent,
        WorkhistoryPopupComponent,
        WorkhistoryDeleteDialogComponent,
        WorkhistoryDeletePopupComponent,
    ],
    providers: [
        WorkhistoryService,
        WorkhistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResumeWorkhistoryModule {}
