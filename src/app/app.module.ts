import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Thrid-party imports:
//ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//loading bar
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

//Project imports:
import { NavComponent, FooterComponent } from './shared';
import { ForumComponent, SectionComponent, ThreadComponent, ProfileComponent  } from './main';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ThreadComponent,
    SectionComponent,
    ForumComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
