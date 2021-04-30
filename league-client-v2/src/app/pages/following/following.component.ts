import { Component, OnInit } from '@angular/core'
import { GeneralUtilsService } from 'src/app/services/general-utils.service'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  followingUserIdsArray: string[] | [] | undefined
  usersSolo: any[] = []
  usersFlex: any[] = []

  constructor(
    private store: StoreService,
    private utils: RequestUtilities,
    private generalUtils: GeneralUtilsService
    ) { }

  // followingData$ = this.store.followingData$
  ngOnInit(): void {
    this.store.followingData$.subscribe(data => {
      console.log('i follower page')
      this.usersSolo = data.usersSolo
      this.usersFlex = data.usersFlex
      console.log(data)

    })
    // this.getFollowers()
  }

  // getFollowers(): void {
  //   this.store.currentUser$.subscribe(userData => {
  //     this.followingUserIdsArray = userData.userDetails.following || []
  //     if (this.followingUserIdsArray) {
  //       this.getMatchesByFollowed(this.followingUserIdsArray)
  //     }
  //   })

  // }

  // async getMatchesByFollowed(followingArray: string[]): Promise<void> {
  //   const soloBoard = []
  //   const flexBoard = []
  //   for (const id of followingArray) {
  //     const res: any = await this.utils.getUserDataByID(id)
  //     // console.log(res)

  //     for (const rankedMatch of res.rankedInfo) {
  //       const {tier, rank, leaguePoints, wins, losses} = rankedMatch
  //       const user = {
  //         name: res.summonerInfo.name,
  //         stats: {tier, rank, leaguePoints, wins, losses}
  //       }
  //       if (rankedMatch.queueType === 'RANKED_FLEX_SR' ) {
  //         flexBoard.unshift(user)
  //       } else {
  //         soloBoard.unshift(user)
  //       }
  //     }
  //   }

  //   this.usersSolo = await this.generalUtils.sortByRank(soloBoard)
  //   this.usersFlex = await this.generalUtils.sortByRank(flexBoard)

  // }
}
