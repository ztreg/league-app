import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs/operators'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'
import { MatchesMetaData, MatchShort } from 'src/app/types/Match'

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {
  allMatches: MatchShort[] | undefined
  nonMetaMatches: MatchShort[] | undefined
  isInStore = false

  start = true
  userAccId!: string
  endIndex = 5
  page = 1
  startIndex = 0
  pageSize = 5
  showErrorComp = false

  constructor(
    private store: StoreService,
    private utils: RequestUtilities
    ) { }

  paginationMetaMatches$ = this.store.pagMetaDataMatches$

  ngOnInit(): void {
    const storeMatches = this.store.getCurrentUserLatestMatches()
    if (storeMatches.length > 0) {
      this.nonMetaMatches = storeMatches
      this.isInStore = true
    } else {
      this.store.myMatches$.subscribe(res => {
        this.allMatches = res
      })
      this.isInStore = false
    }
    this.resetPaginationMatchesInStore()
  }

  resetPaginationMatchesInStore(): void {
    this.paginationMetaMatches$.pipe(take(1)).subscribe(res => {
      if (res.length > 0) {
        this.store.updatePagMetaDataMatches([])
      }
    })
  }

async getPagMatches(option: string): Promise<void> {
  this.store.currentUser$.pipe(take(1)).subscribe(userData => {
    this.userAccId = userData.accountId
  })

  if (option === 'more') {
      this.page++
      this.startIndex += 5
      this.endIndex += 5
      const res = await this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex, true)
      if (res && res.status) {
        this.showErrorComp = true
      }

     } else if (option === 'less') {
      this.page--
      this.startIndex -= 5
      this.endIndex -= 5
      if (this.startIndex <= 0) {
        this.start = true
        this.startIndex = 0
      }
      const res = await this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex, true)
      if (res && res.status) {
        this.showErrorComp = true
      }
      this.start = false
    }
  }
}
