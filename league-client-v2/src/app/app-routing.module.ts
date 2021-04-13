import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchListItemComponent } from './components/match-list-item/match-list-item.component';
import { FollowingComponent } from './pages/following/following.component';
import { HomeComponent } from './pages/home/home.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { MatchesComponent } from './pages/matches/matches.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'matches',
    component: MatchesComponent
  },
  {
    path: 'matches/:id',
    component: MatchDetailsComponent
  },
  {
    path: 'following',
    component: FollowingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
