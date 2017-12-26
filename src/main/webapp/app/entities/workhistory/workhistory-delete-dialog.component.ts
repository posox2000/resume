import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Workhistory } from './workhistory.model';
import { WorkhistoryPopupService } from './workhistory-popup.service';
import { WorkhistoryService } from './workhistory.service';

@Component({
    selector: 'jhi-workhistory-delete-dialog',
    templateUrl: './workhistory-delete-dialog.component.html'
})
export class WorkhistoryDeleteDialogComponent {

    workhistory: Workhistory;

    constructor(
        private workhistoryService: WorkhistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workhistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'workhistoryListModification',
                content: 'Deleted an workhistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-workhistory-delete-popup',
    template: ''
})
export class WorkhistoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workhistoryPopupService: WorkhistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.workhistoryPopupService
                .open(WorkhistoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
