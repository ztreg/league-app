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
  testID = "22UXnMIItBvFoYv_SJ-O_QnV6GBGPlFu5q-Lu4ZcW9lD1uNqs69xW4Q_"
  ngOnInit(): void {
    this.store.updateCurrentUser({accountId: 'UJhJTXVRisEi4S2ASXmhUmDEYhWJIBfPSmMbQdhAfbM'})
    this.store.currentUser$.subscribe(res => {
      this.currentUserAccountId = res.accountId
    })
   
    this.utils.getAllItemsData()
    this.utils.getAllChampions()
    this.utils.getAllSummoners()
  }

}
