/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ResumeTestModule } from '../../../test.module';
import { WorkhistoryDetailComponent } from '../../../../../../main/webapp/app/entities/workhistory/workhistory-detail.component';
import { WorkhistoryService } from '../../../../../../main/webapp/app/entities/workhistory/workhistory.service';
import { Workhistory } from '../../../../../../main/webapp/app/entities/workhistory/workhistory.model';

describe('Component Tests', () => {

    describe('Workhistory Management Detail Component', () => {
        let comp: WorkhistoryDetailComponent;
        let fixture: ComponentFixture<WorkhistoryDetailComponent>;
        let service: WorkhistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ResumeTestModule],
                declarations: [WorkhistoryDetailComponent],
                providers: [
                    WorkhistoryService
                ]
            })
            .overrideTemplate(WorkhistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkhistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkhistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Workhistory(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.workhistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
