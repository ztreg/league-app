import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RequestService } from 'src/app/services/request.service'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private utils: RequestUtilities,
    private req: RequestService
  ) { }

  matchID: string | null | undefined
  match: any
  matchOverview: any
  errorMsg = false
  ngOnInit(): void {
    this.getPathParams()
    this.getMatchDetails()
  }

  getPathParams(): void {
    this.matchID = this.route.snapshot.paramMap.get('id')
  }

  async getMatchDetails(): Promise<void> {
    try {
     const res: any = await this.req.getMatchDetails(this.matchID || '')
     this.match = res
     const {teams, gameDuration, gameVersion} = this.match
     this.matchOverview = { teams, gameDuration, gameVersion }
    } catch (error) {
      this.errorMsg = true
    }
  }
}
