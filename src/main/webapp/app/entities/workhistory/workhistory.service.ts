import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Workhistory } from './workhistory.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WorkhistoryService {

    private resourceUrl = SERVER_API_URL + 'api/workhistories';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(workhistory: Workhistory): Observable<Workhistory> {
        const copy = this.convert(workhistory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(workhistory: Workhistory): Observable<Workhistory> {
        const copy = this.convert(workhistory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Workhistory> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Workhistory.
     */
    private convertItemFromServer(json: any): Workhistory {
        const entity: Workhistory = Object.assign(new Workhistory(), json);
        entity.startDate = this.dateUtils
            .convertLocalDateFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertLocalDateFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a Workhistory to a JSON which can be sent to the server.
     */
    private convert(workhistory: Workhistory): Workhistory {
        const copy: Workhistory = Object.assign({}, workhistory);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(workhistory.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(workhistory.endDate);
        return copy;
    }
}
