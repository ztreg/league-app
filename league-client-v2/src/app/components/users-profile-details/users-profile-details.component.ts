import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, take } from 'rxjs/operators'
import { GeneralUtilsService } from 'src/app/services/general-utils.service'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'
import { User } from 'src/app/types/User'

@Component({
  selector: 'app-users-profile-details',
  templateUrl: './users-profile-details.component.html',
  styleUrls: ['./users-profile-details.component.scss']
})
export class UsersProfileDetailsComponent implements OnInit {
  @Input() userData: any
  constructor(
    private utils: RequestUtilities,
    private store: StoreService,
    private router: ActivatedRoute,
    private generalUtils: GeneralUtilsService
  ) { }
  profileMatches$ = this.store.profileMatches$
  myMatches$ = this.store.myMatches$
  nonMetaMatches: any = []
  isMe = false
  isInStore = false
  emblemsLoaded = false
  favChamp = ''

  ranksAsEmblem: any = []

  async ngOnInit(): Promise<void> {
    this.getRankedEmblems()
    const userId: any = this.router.snapshot.paramMap.get('id')
    try {
      if (userId) {
        this.favChamp = await this.utils.getUserMatches(userId, 0, 5)
      } else {
        const loggedInUserMatches = this.store.getCurrentUserLatestMatches()
        if (loggedInUserMatches.length > 0) {
          this.nonMetaMatches = loggedInUserMatches
          this.isInStore = true
        } else {
          this.isInStore = false
        }
        this.store.currentUser$.pipe(take(1)).subscribe( res => {
          this.favChamp = res.favChamp
          this.isMe = true
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  getRankedEmblems(): void {
    if (this.userData.rankedInfo.length > 0) {
      for (const infoRow of this.userData.rankedInfo) {
        if (infoRow.tier) {
          const emblem = this.generalUtils.getRankedEmblems(infoRow.tier)
          this.ranksAsEmblem.push(emblem)
        }
      }
    }
  }

}
