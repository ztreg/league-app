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
      this.usersSolo = data.usersSolo
      this.usersFlex = data.usersFlex
    })
  }
}
