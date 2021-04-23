import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
    this.router.navigate(['login'])
    this.ref.detectChanges()

  }
}
