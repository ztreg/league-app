import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuardService as AuthGuard, AuthGuardService } from './auth/auth-guard.service'
import { AuthGuardLoggedinService } from './auth/auth-loggedin.service'
import { MatchListItemComponent } from './components/match-list-item/match-list-item.component'
import { UsersProfileComponent } from './components/users-profile/users-profile.component'
import { FollowingComponent } from './pages/following/following.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { MatchDetailsComponent } from './pages/match-details/match-details.component'
import { MatchesComponent } from './pages/matches/matches.component'
import { SignupComponent } from './pages/signup/signup.component'
import { UserComponent } from './pages/user/user.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'matches',
    component: MatchesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'matches/:id',
    component: MatchDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UsersProfileComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardLoggedinService]
  },
    { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
