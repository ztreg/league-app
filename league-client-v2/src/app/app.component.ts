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

  ngOnInit(): void {
    this.store.updateCurrentUser({accountId: 'UJhJTXVRisEi4S2ASXmhUmDEYhWJIBfPSmMbQdhAfbM'})
    this.store.currentUser$.subscribe(res => {
      this.currentUserAccountId = res.accountId
    })
    this.utils.checkIfStoreAsData()
    this.utils.getAllChampions()
    this.utils.getAllSummoners()
    this.utils.getUserMatches(this.currentUserAccountId)
  }

}
