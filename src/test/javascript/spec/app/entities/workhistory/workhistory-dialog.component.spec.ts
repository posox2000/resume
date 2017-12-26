/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeTestModule } from '../../../test.module';
import { WorkhistoryDialogComponent } from '../../../../../../main/webapp/app/entities/workhistory/workhistory-dialog.component';
import { WorkhistoryService } from '../../../../../../main/webapp/app/entities/workhistory/workhistory.service';
import { Workhistory } from '../../../../../../main/webapp/app/entities/workhistory/workhistory.model';

describe('Component Tests', () => {

    describe('Workhistory Management Dialog Component', () => {
        let comp: WorkhistoryDialogComponent;
        let fixture: ComponentFixture<WorkhistoryDialogComponent>;
        let service: WorkhistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ResumeTestModule],
                declarations: [WorkhistoryDialogComponent],
                providers: [
                    WorkhistoryService
                ]
            })
            .overrideTemplate(WorkhistoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkhistoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkhistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Workhistory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.workhistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workhistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Workhistory();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.workhistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workhistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
