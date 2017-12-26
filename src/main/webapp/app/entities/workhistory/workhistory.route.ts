import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WorkhistoryComponent } from './workhistory.component';
import { WorkhistoryDetailComponent } from './workhistory-detail.component';
import { WorkhistoryPopupComponent } from './workhistory-dialog.component';
import { WorkhistoryDeletePopupComponent } from './workhistory-delete-dialog.component';

export const workhistoryRoute: Routes = [
    {
        path: 'workhistory',
        component: WorkhistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workhistories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'workhistory/:id',
        component: WorkhistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workhistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workhistoryPopupRoute: Routes = [
    {
        path: 'workhistory-new',
        component: WorkhistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workhistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'workhistory/:id/edit',
        component: WorkhistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workhistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'workhistory/:id/delete',
        component: WorkhistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workhistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
