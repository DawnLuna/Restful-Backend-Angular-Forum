import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Thrid-party imports:
//ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { AuthComponent } from '../../../main';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    AuthModuleRoutingModule
  ]
})
export class AuthModuleModule { }
