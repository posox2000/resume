import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Workhistory } from './workhistory.model';
import { WorkhistoryPopupService } from './workhistory-popup.service';
import { WorkhistoryService } from './workhistory.service';

@Component({
    selector: 'jhi-workhistory-dialog',
    templateUrl: './workhistory-dialog.component.html'
})
export class WorkhistoryDialogComponent implements OnInit {

    workhistory: Workhistory;
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private workhistoryService: WorkhistoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.workhistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workhistoryService.update(this.workhistory));
        } else {
            this.subscribeToSaveResponse(
                this.workhistoryService.create(this.workhistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<Workhistory>) {
        result.subscribe((res: Workhistory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Workhistory) {
        this.eventManager.broadcast({ name: 'workhistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-workhistory-popup',
    template: ''
})
export class WorkhistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workhistoryPopupService: WorkhistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.workhistoryPopupService
                    .open(WorkhistoryDialogComponent as Component, params['id']);
            } else {
                this.workhistoryPopupService
                    .open(WorkhistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
