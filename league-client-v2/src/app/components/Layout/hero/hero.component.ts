import { Component, Input, OnInit } from '@angular/core'
import { map, take } from 'rxjs/operators'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() userData: any
  @Input() favChamp: any
  isFollowed = false
  constructor(
    private store: StoreService,
    private utils: RequestUtilities
  ) { }

  currentUser$ = this.store.currentUser$.pipe(
    map(data => {
      const {imageURL } = data.favChamp
      data.favChampUrl = `url(${imageURL})`
      const {following} = data.userDetails
      let i = 0
      for (const follow of following) {
        i++
        if (follow === this.userData.accountId) {
          this.isFollowed = true
          continue
        }
        if (i === following.length) {
          this.isFollowed = false
        }
      }

      return data
    })
  )

  ngOnInit(): void {
    const {imageURL } = this.favChamp
    this.userData.favoriteChampUrl = `url(${imageURL})`
  }

   followUser(accountId: string): void {
    if (accountId) {
      this.store.currentUser$.pipe(take(1)).subscribe(async res => {
         const followUserResulst = await this.utils.followUser(accountId, res.userDetails.id)
         if (followUserResulst.nModified === 1) {
           this.addUserToStore(accountId)
         }
      })
    }
  }

  unFollowUser(accountId: string): void {
    this.store.currentUser$.pipe(take(1)).subscribe(async res => {
      const unFollowUserResult = await this.utils.followUser(accountId, res.userDetails.id)
      if (unFollowUserResult.nModified === 1) {
        this.removeUserFromStore(accountId)
      }
   })
  }

  addUserToStore(id: string): void {
    let userPlacerholder: any = {}
    this.store.currentUser$.pipe(take(1)).subscribe(res => {
      userPlacerholder = res
      userPlacerholder.userDetails.following.push(id)

   })
    this.store.updateCurrentUser(userPlacerholder)
    sessionStorage.setItem('user', JSON.stringify(userPlacerholder))
  }

  removeUserFromStore(id: string): void {
    let userPlacerholder: any = {}
    this.store.currentUser$.pipe(take(1)).subscribe(res => {
      userPlacerholder = res
      const following = userPlacerholder.userDetails.following
      const userIndex = following.findIndex((accountId: string) => accountId === id)
      userPlacerholder.userDetails.following.splice(userIndex, 1)
   })
    this.store.updateCurrentUser(userPlacerholder)
    sessionStorage.setItem('user', JSON.stringify(userPlacerholder))
  }
}
