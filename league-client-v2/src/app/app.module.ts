import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchListItemComponent } from './components/match-list-item/match-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './materal-modules';
import { HeaderComponent } from './components/Layout/header/header.component';
import { FollowingComponent } from './pages/following/following.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { MatchFullDetailsComponent } from './components/match-full-details/match-full-details.component';
import { MatchFullDetailsHeaderComponent } from './components/match-full-details-header/match-full-details-header.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchesComponent,
    MatchListComponent,
    MatchListItemComponent,
    HeaderComponent,
    FollowingComponent,
    MatchDetailsComponent,
    MatchFullDetailsComponent,
    MatchFullDetailsHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
