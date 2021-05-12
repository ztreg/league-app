import { Component, Input, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { RequestUtilities } from 'src/app/services/requestUtils';
import { StoreService } from 'src/app/services/store.service';

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
      console.log('JAG ÄR I PIPEN LUL');
      
      const {imageURL } = data.favChamp
      data.favChampUrl = `url(${imageURL})`
      const {following} = data.userDetails
      for (const follow of following) {    
        if(follow === this.userData.accountId) {
          this.isFollowed = true
        } 
      }
      
      return data
    })
  )

  ngOnInit(): void {
    console.log(this.favChamp);
    
    const {imageURL } = this.favChamp
    this.userData.favoriteChampUrl = `url(${imageURL})`
  }

   followUser(accountId: string): void {
    if(accountId) {
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
      console.log(unFollowUserResult);
      
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
  }

  removeUserFromStore(id: string): void {
    let userPlacerholder: any = {}
    this.store.currentUser$.pipe(take(1)).subscribe(res => {
      userPlacerholder = res
      const {following} = userPlacerholder.userDetails
      const userIndex = following.findIndex((accountId: string) => accountId === id);
      userPlacerholder.userDetails.following.splice(userIndex, 1)
   })
   console.log(userPlacerholder);
   
   this.store.updateCurrentUser(userPlacerholder)
  }
}
