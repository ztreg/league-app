// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'

const jwt = new JwtHelperService()
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token: any = sessionStorage.getItem('token')
    console.log(token)

    // Check whether the token is expired and return
    // true or false
    return !jwt.isTokenExpired(token)
  }
}
