import { Component, OnInit } from '@angular/core'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {
  allMatches: any = []
  nonMetaMetaches: any = []
  isInStore = false

  start = true
  userAccId!: string
  endIndex = 5
  page = 1
  startIndex = 0
  pageSize = 5

  once = false

  constructor(
    private store: StoreService,
    private utils: RequestUtilities
  ) { }

  ngOnInit(): void {
    const storeMatches = this.store.getCurrentUserLatestMatches()
    if (storeMatches.length > 0) {
      this.nonMetaMetaches = storeMatches
      this.isInStore = true
    } else {
      console.log('isnt in store')

      this.store.myMatches$.subscribe(res => {
        console.log(res)

        this.allMatches = res
      })
    }

  }

  getPagMatches(option: boolean | string): void {
    if (typeof option === 'string') {
      this.page = 1
      this.startIndex = 0
      this.endIndex = 5
      this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex)
     } else if (option) {
      this.page++
      this.startIndex += 5
      this.endIndex += 5
      this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex)
      this.start = false
     } else {
      this.page--
      this.startIndex -= 5
      this.endIndex -= 5
      if (this.startIndex <= 0) {
        this.start = true
        this.startIndex = 0
      }
      this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex)
    }
  }
}
