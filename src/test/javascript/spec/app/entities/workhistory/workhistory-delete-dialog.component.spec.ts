/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeTestModule } from '../../../test.module';
import { WorkhistoryDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/workhistory/workhistory-delete-dialog.component';
import { WorkhistoryService } from '../../../../../../main/webapp/app/entities/workhistory/workhistory.service';

describe('Component Tests', () => {

    describe('Workhistory Management Delete Component', () => {
        let comp: WorkhistoryDeleteDialogComponent;
        let fixture: ComponentFixture<WorkhistoryDeleteDialogComponent>;
        let service: WorkhistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ResumeTestModule],
                declarations: [WorkhistoryDeleteDialogComponent],
                providers: [
                    WorkhistoryService
                ]
            })
            .overrideTemplate(WorkhistoryDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkhistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkhistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
