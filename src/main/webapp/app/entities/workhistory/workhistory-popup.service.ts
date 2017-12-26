import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Workhistory } from './workhistory.model';
import { WorkhistoryService } from './workhistory.service';

@Injectable()
export class WorkhistoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private workhistoryService: WorkhistoryService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.workhistoryService.find(id).subscribe((workhistory) => {
                    if (workhistory.startDate) {
                        workhistory.startDate = {
                            year: workhistory.startDate.getFullYear(),
                            month: workhistory.startDate.getMonth() + 1,
                            day: workhistory.startDate.getDate()
                        };
                    }
                    if (workhistory.endDate) {
                        workhistory.endDate = {
                            year: workhistory.endDate.getFullYear(),
                            month: workhistory.endDate.getMonth() + 1,
                            day: workhistory.endDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.workhistoryModalRef(component, workhistory);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.workhistoryModalRef(component, new Workhistory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    workhistoryModalRef(component: Component, workhistory: Workhistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.workhistory = workhistory;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
