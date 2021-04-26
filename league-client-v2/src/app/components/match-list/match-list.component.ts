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
  start = true
  userAccId!: string
  page = 1
  startIndex = 0
  endIndex = 10
  pageSize = 10

  once = false

  constructor(
    private store: StoreService,
    private utils: RequestUtilities
  ) { }

  ngOnInit(): void {
    if (!this.once) {
      this.getPagMatches('yo')
      this.once = true
    }

    this.store.myMatches$.subscribe(matches => {
      this.allMatches = matches
    })
  }

  getPagMatches(option: boolean | string): void {

    this.store.currentUser$.subscribe(res => {
      this.userAccId = res.accountId
    })

    if (typeof option === 'string') {
      this.page = 1
      this.startIndex = 0
      this.endIndex = 10
      this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex)
     } else if (option) {
      this.page++
      this.startIndex += 10
      this.endIndex += 10
      this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex)
      this.start = false
     } else {
      this.page--
      this.startIndex -= 10
      this.endIndex -= 10
      if (this.startIndex <= 0) {
        this.start = true
        this.startIndex = 0
      }
      this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex)
    }
  }
}
