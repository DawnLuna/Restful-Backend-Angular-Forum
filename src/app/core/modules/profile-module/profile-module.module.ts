import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Thrid-party imports:
//ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileModuleRoutingModule } from './profile-module-routing.module';
import { ProfileComponent } from '../../../main';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    ProfileModuleRoutingModule
  ]
})
export class ProfileModuleModule { }
