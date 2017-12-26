import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Workhistory } from './workhistory.model';
import { WorkhistoryService } from './workhistory.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-workhistory',
    templateUrl: './workhistory.component.html'
})
export class WorkhistoryComponent implements OnInit, OnDestroy {
workhistories: Workhistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private workhistoryService: WorkhistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.workhistoryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.workhistories = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkhistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Workhistory) {
        return item.id;
    }
    registerChangeInWorkhistories() {
        this.eventSubscriber = this.eventManager.subscribe('workhistoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
