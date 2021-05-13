import { Injectable } from '@angular/core'
import { BehaviorSubject, ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // tslint:disable: variable-name
  private readonly _currentUser = new ReplaySubject<any>(1)
  private readonly _myMatches = new ReplaySubject<any>(1)
  private readonly _currentUserLatestMatches = new BehaviorSubject<any[]>([])
  private readonly _profileMatches = new ReplaySubject<any>(1)
  private readonly _allChampions = new ReplaySubject<any>(1)
  private readonly _allSummoners = new ReplaySubject<any>(1)
  private readonly _allItems = new ReplaySubject<any>(1)


  private readonly _followingData = new ReplaySubject<any>(1)

  private readonly _currentProfileData = new ReplaySubject<any>(1)

  readonly currentUser$ = this._currentUser.asObservable()
  readonly currentProfileData$ = this._currentProfileData.asObservable()
  readonly myMatches$ = this._myMatches.asObservable()
  readonly currentUserLatestMatches$ = this._currentUserLatestMatches.asObservable()
  readonly profileMatches$ = this._profileMatches.asObservable()
  readonly allChampions$ = this._allChampions.asObservable()
  readonly allSummoners$ = this._allSummoners.asObservable()
  readonly allItems$ = this._allItems.asObservable()

  readonly followingData$ = this._followingData.asObservable()

  private set currentUser(val: any) {
    this._currentUser.next(val)
  }

  private set currentProfileData(val: any) {
    this._currentProfileData.next(val)
  }

  private set followingData(val: any) {
    this._followingData.next(val)
  }

  private set myMatches(val: any) {
    this._myMatches.next(val)
  }

  private set currentUserLatestMatches(val: any[]) {
    this._currentUserLatestMatches.next(val)
  }
  private get currentUserLatestMatches(): any[] {
    return this._currentUserLatestMatches.getValue()
  }

  getCurrentUserLatestMatches(): any[] {
    return this.currentUserLatestMatches
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

  updateCurrentProfileData(val: any): void {
    this.currentProfileData = val
  }

  updateFollowingData(val: any): void {
    this.followingData = val
  }

  updateCurrentUser(val: any): void {
    this.currentUser = val
  }

  updateMyMatches(val: any): void {
    this.myMatches = val
  }

  updateCurrentUserLatestMatches(val: any[]): void {
    this.currentUserLatestMatches = val
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
