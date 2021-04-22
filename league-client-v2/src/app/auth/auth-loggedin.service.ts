// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthService } from './auth.service'
@Injectable()
export class AuthGuardLoggedinService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['matches'])
      return false
    }

    return true
  }
}
