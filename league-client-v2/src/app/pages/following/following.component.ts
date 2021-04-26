import { Component, OnInit } from '@angular/core'
import { match } from 'cypress/types/sinon'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'
import { MatchShort } from 'src/app/types/Match'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  followingUserIdsArray: string[] | [] | undefined
  users: any

  constructor(
    private store: StoreService,
    private utils: RequestUtilities
    ) { }

  ngOnInit(): void {
    this.getFollowers()
  }

  getFollowers(): void {
    this.store.currentUser$.subscribe(userData => {
      this.followingUserIdsArray = userData.userDetails.following || []
      if (this.followingUserIdsArray) {
        this.getMatchesByFollowed(this.followingUserIdsArray)
      }
    })

  }

  async getMatchesByFollowed(followingArray: any[]): Promise<void> {
    for (const id of followingArray) {

    }

  }

}
