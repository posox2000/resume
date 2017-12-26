import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Workhistory } from './workhistory.model';
import { WorkhistoryService } from './workhistory.service';

@Component({
    selector: 'jhi-workhistory-detail',
    templateUrl: './workhistory-detail.component.html'
})
export class WorkhistoryDetailComponent implements OnInit, OnDestroy {

    workhistory: Workhistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private workhistoryService: WorkhistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWorkhistories();
    }

    load(id) {
        this.workhistoryService.find(id).subscribe((workhistory) => {
            this.workhistory = workhistory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWorkhistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'workhistoryListModification',
            (response) => this.load(this.workhistory.id)
        );
    }
}
