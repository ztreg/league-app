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
  isFollowed = false
  constructor(private store: StoreService, private utils: RequestUtilities) { }
  currentUser$ = this.store.currentUser$.pipe(
    map(data => {
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
    this.userData.favoriteChampUrl = `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_5.jpg)`
  }

   followUser(accountId: string): void {
    if(accountId) {
      this.store.currentUser$.pipe(take(1)).subscribe(async res => {
         const yes = await this.utils.followUser(accountId, res.userDetails.id)
         if (yes.nModified === 1) {
           this.addUserToStore(accountId)
         }
      })
    }
  }

  addUserToStore(id: string): void {
    let userPlacerholder: any = {}
    this.store.currentUser$.pipe(take(1)).subscribe(res => {
      userPlacerholder = res
      userPlacerholder.userDetails.following.push(id)
   })
   this.store.updateCurrentUser(userPlacerholder)
   console.log(userPlacerholder)
  }

}
