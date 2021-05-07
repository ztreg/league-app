import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { GeneralUtilsService } from 'src/app/services/general-utils.service'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'

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
  nonMetaMetaches: any = []
  isMe = false
  isInStore = false

  ngOnInit(): void {
    this.store.currentUser$.subscribe(res => {
      if (res.name === this.userData.summonerInfo.name) {
        console.log('isme')

        this.isMe = true
      } else {
        console.log('not me')

        const userId: any = this.router.snapshot.paramMap.get('id')
        this.utils.getUserMatches(userId, 0, 5)
      }
    })
    const hasMatches = this.store.getCurrentUserLatestMatches()
    if (hasMatches.length > 0) {
      console.log('is in store')
      this.nonMetaMetaches = hasMatches

      this.isInStore = true
    } else {
      this.isInStore = false
      console.log('isnt in store')
    }

    this.getRankedEmblems()
  }

  getRankedEmblems(): void {
    if (this.userData.rankedInfo) {
      for (const infoRow of this.userData.rankedInfo) {
        infoRow.emblemPath = this.generalUtils.getRankedEmblems(infoRow.tier)
      }
    }
  }

}
