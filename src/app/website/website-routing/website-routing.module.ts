import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { WebsiteUpdateComponent } from '../website-update/website-update.component';
import { WebsiteDeleteComponent } from '../website-delete/website-delete.component';
import { WebsiteListComponent } from '../website-list/website-list.component';
import { WebsiteCreateComponent } from '../website-create/website-create.component';

const routes: Routes = [
  { path: 'websites', component: WebsiteListComponent },
  //{ path: 'details/:id', component: WebsiteDetailsComponent },
  { path: 'create', component: WebsiteCreateComponent },
  { path: 'update/:id', component: WebsiteUpdateComponent },
  { path: 'delete/:id', component: WebsiteDeleteComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class WebsiteRoutingModule { }