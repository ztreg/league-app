// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { StoreService } from '../services/store.service'

const jwt = new JwtHelperService()
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private store: StoreService) {}
  // ...
  public isAuthenticated(): boolean {
    const token: any = sessionStorage.getItem('token')
    // Check whether the token is expired and return
    // true or false
    if (jwt.isTokenExpired(token)) {
      this.store.updateCurrentUser(false)
      this.store.updateCurrentProfileData(false)
      this.store.updateCurrentUserLatestMatches([])
      this.store.updateProfileMatches(false)
      this.store.updateFollowingData(false)
      this.store.updateMyMatches(false)
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
    }
    return !jwt.isTokenExpired(token)
  }
}
