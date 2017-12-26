import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ResumeWorkhistoryModule } from './workhistory/workhistory.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ResumeWorkhistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResumeEntityModule {}
