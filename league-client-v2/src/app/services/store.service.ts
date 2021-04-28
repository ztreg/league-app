import { Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly _currentUser = new ReplaySubject<any>(1)
  private readonly _myMatches = new ReplaySubject<any>(1)
  private readonly _profileMatches = new ReplaySubject<any>(1)
  private readonly _allChampions = new ReplaySubject<any>(1)
  private readonly _allSummoners = new ReplaySubject<any>(1)
  private readonly _allItems = new ReplaySubject<any>(1)

  readonly currentUser$ = this._currentUser.asObservable()
  readonly myMatches$ = this._myMatches.asObservable()
  readonly profileMatches$ = this._profileMatches.asObservable()
  readonly allChampions$ = this._allChampions.asObservable()
  readonly allSummoners$ = this._allSummoners.asObservable()
  readonly allItems$ = this._allItems.asObservable()

  private set currentUser(val: any) {
    this._currentUser.next(val)
  }

  private set myMatches(val: any) {
    this._myMatches.next(val)
  }

  private set profileMatches(val: any) {
    this._profileMatches.next(val)
  }

  private set allChampions(val: any) {
    this._allChampions.next(val)
  }

  private set allSummoners(val: any) {
    this._allSummoners.next(val)
  }

  private set allItems(val: any) {
    this._allItems.next(val)
  }

  updateCurrentUser(val: any): void {
    this.currentUser = val
  }

  updateMyMatches(val: any): void {
    this.myMatches = val
  }

  updateProfileMatches(val: any): void {
    this.profileMatches = val
  }

  updateAllChampions(val: any): void {
    this.allChampions = val
  }

  updateAllSummoners(val: any): void {
    this.allSummoners = val
  }

  updateAllItems(val: any): void {
    this.allItems = val
  }
  constructor() { }
}
