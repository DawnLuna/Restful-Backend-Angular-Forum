import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Thrid-party imports:
//ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-module-routing.module';
import { AdminComponent } from '../../../main';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
