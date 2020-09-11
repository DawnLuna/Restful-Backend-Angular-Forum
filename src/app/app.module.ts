import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Thrid-party imports:
//ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//loading bar
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
//@kolkov/angular-editor
import { AngularEditorModule } from '@kolkov/angular-editor';

//Project imports:
import { NavComponent, FooterComponent } from './shared';
import { ForumComponent, SectionComponent, ThreadComponent, PostComponent, ProfileComponent, AuthComponent, AdminComponent } from './main';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ThreadComponent,
    SectionComponent,
    ForumComponent,
    ProfileComponent,
    PostComponent,
    AuthComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
