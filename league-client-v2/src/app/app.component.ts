import { Component, OnInit } from '@angular/core'
import { RequestUtilities } from './services/requestUtils'
import { StoreService } from './services/store.service'
import { MatchesMetaData } from './types/Match'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private utils: RequestUtilities, private store: StoreService) {}
  showErrorComp = false
  async ngOnInit(): Promise<void> {
    // Meta-data about the game
    this.utils.getAllItemsData()
    this.utils.getAllChampions()
    this.utils.getAllSummoners()
    const storageData: any = sessionStorage.getItem('user')
    const data = JSON.parse(storageData)
    if (data) {
      this.store.updateCurrentUser(data)
      const metaDataResult: MatchesMetaData = await this.utils.getMyUserMatches(data.accountId, 0, 5, false)
      if (metaDataResult.status && metaDataResult.status.status_code === 429) {
        this.showErrorComp = true
      } else {
        this.utils.fillFollowerDataToStore()
      }
    }
  }
}
