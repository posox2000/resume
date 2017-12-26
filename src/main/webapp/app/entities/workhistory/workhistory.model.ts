import { BaseEntity } from './../../shared';

export class Workhistory implements BaseEntity {
    constructor(
        public id?: number,
        public companyName?: string,
        public location?: string,
        public position?: string,
        public startDate?: any,
        public endDate?: any,
        public jobDescription?: string,
    ) {
    }
}
