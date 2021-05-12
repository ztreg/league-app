import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false
  menuListLoggedIn = [
    {
      name: 'Home',
      link: '/matches'
    },
    {
      name: 'Leaderboard',
      link: '/following'
    },
    {
      name: 'Profile',
      link: '/profile'
    }
  ]

  menuListNotLoggedIn = [
    {
      name: 'Home',
      link: '/login'
    },
    {
      name: 'Login',
      link: '/login'
    },
    {
      name: 'Signup',
      link: '/signup'
    }
  ]
  searchBar = false

  constructor(
    private store: StoreService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }
  currentUser$ = this.store.currentUser$

  ngOnInit(): void {
  }

  logout(): void {
    this.store.updateCurrentUser(null)
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    this.store.updateCurrentProfileData(null)
    this.store.updateCurrentUserLatestMatches([null])
    this.store.updateFollowingData(null)
    this.store.updateMyMatches(null)
    this.ref.detectChanges()
    this.router.navigate(['login'])
  }
  onSidenavClick(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  showSearchBar(): void {
    this.searchBar = !this.searchBar
  }
}
