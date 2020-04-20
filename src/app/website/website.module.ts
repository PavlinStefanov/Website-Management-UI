import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { WebsiteService } from './website.service';
import { WebsiteListComponent } from './website-list/website-list.component';
import { WebsiteCreateComponent } from './website-create/website-create.component';
import { WebsiteUpdateComponent } from './website-update/website-update.component';
import { WebsiteDeleteComponent } from './website-delete/website-delete.component';
import { WebsiteRoutingModule } from './website-routing/website-routing.module';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      WebsiteRoutingModule,
      SharedModule
    ],
    declarations: [
      WebsiteListComponent,
      WebsiteCreateComponent,
      WebsiteUpdateComponent,
      WebsiteDeleteComponent
    ],
    providers: [
      WebsiteService
    ]
  })
  export class WebsiteModule { }