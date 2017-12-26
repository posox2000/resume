/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ResumeTestModule } from '../../../test.module';
import { WorkhistoryComponent } from '../../../../../../main/webapp/app/entities/workhistory/workhistory.component';
import { WorkhistoryService } from '../../../../../../main/webapp/app/entities/workhistory/workhistory.service';
import { Workhistory } from '../../../../../../main/webapp/app/entities/workhistory/workhistory.model';

describe('Component Tests', () => {

    describe('Workhistory Management Component', () => {
        let comp: WorkhistoryComponent;
        let fixture: ComponentFixture<WorkhistoryComponent>;
        let service: WorkhistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ResumeTestModule],
                declarations: [WorkhistoryComponent],
                providers: [
                    WorkhistoryService
                ]
            })
            .overrideTemplate(WorkhistoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkhistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkhistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Workhistory(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.workhistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
