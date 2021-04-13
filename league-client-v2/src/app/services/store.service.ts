import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly _currentUser = new ReplaySubject<any>(1)

  private readonly _myMatches = new ReplaySubject<any>(1)

  readonly currentUser$ = this._currentUser.asObservable()

  readonly myMatches$ = this._myMatches.asObservable()

  private set currentUser(val: any) {
    this._currentUser.next(val)
  }

  private set myMatches(val: any) {
    this._myMatches.next(val)
  }

  updateCurrentUser(val: any): void {
    this.currentUser = val
  }

  updateMyMatches(val: any): void {
    this.myMatches = val
  }

  constructor() { }
}
