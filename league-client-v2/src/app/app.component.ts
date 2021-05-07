import { Component, OnInit } from '@angular/core'
import { RequestUtilities } from './services/requestUtils'
import { StoreService } from './services/store.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private utils: RequestUtilities, private store: StoreService) {}
  currentUserAccountId!: string
  testID = '22UXnMIItBvFoYv_SJ-O_QnV6GBGPlFu5q-Lu4ZcW9lD1uNqs69xW4Q_'

  ngOnInit(): void {
    const storageData: any = sessionStorage.getItem('user')
    const data = JSON.parse(storageData)
    this.store.updateCurrentUser(data)
    if (data) {
      console.log('getting the matches dud')
      this.utils.fillFollowerDataToStore()
      this.utils.getMyUserMatches(data.accountId, 0, 5)
    }
    // Meta-data about the game
    this.utils.getAllItemsData()
    this.utils.getAllChampions()
    this.utils.getAllSummoners()
  }

}
