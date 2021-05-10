import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { MatchesComponent } from './pages/matches/matches.component'
import { MatchListComponent } from './components/match-list/match-list.component'
import { MatchListItemComponent } from './components/match-list-item/match-list-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModules } from './materal-modules'
import { HeaderComponent } from './components/Layout/header/header.component'
import { FollowingComponent } from './pages/following/following.component'
import { MatchDetailsComponent } from './pages/match-details/match-details.component'
import { MatchFullDetailsComponent } from './components/match-full-details/match-full-details.component'
import { MatchFullDetailsHeaderComponent } from './components/match-full-details-header/match-full-details-header.component'
import { MatchCardComponent } from './components/match-card/match-card.component'
import { UserComponent } from './pages/user/user.component'
import { SignupComponent } from './pages/signup/signup.component'
import { FormComponent } from './components/form/form.component'
import { InputComponent } from './components/input/input.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './pages/login/login.component'
import { DatePipe } from '@angular/common'
import { AuthGuardService } from './auth/auth-guard.service'
import { AuthService } from './auth/auth.service'
import { JwtModule, JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt'
import { AuthGuardLoggedinService } from './auth/auth-loggedin.service'
import { UsersProfileComponent } from './components/users-profile/users-profile.component'
import { UsersProfileDetailsComponent } from './components/users-profile-details/users-profile-details.component'
import { HeroComponent } from './components/layout/hero/hero.component'
import { FooterComponent } from './components/Layout/footer/footer.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartComponent } from './components/utils/chart/chart.component'
import { MatchListNonmetaItemComponent } from './components/match-list-nonmeta-item/match-list-nonmeta-item.component';
import { SearchBarComponent } from './components/layout/search-bar/search-bar.component'
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
    MatchFullDetailsHeaderComponent,
    MatchCardComponent,
    UserComponent,
    SignupComponent,
    FormComponent,
    InputComponent,
    LoginComponent,
    UsersProfileComponent,
    UsersProfileDetailsComponent,
    HeroComponent,
    FooterComponent,
    ChartComponent,
    MatchListNonmetaItemComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
    NgApexchartsModule,
  ],
  providers: [
    DatePipe,
    AuthGuardService,
    AuthGuardLoggedinService,
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
