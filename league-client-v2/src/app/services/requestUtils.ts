import { Injectable } from '@angular/core'
import { RequestService } from './request.service'
import { StoreService } from './store.service'

@Injectable({
  providedIn: 'root'
})
export class RequestUtilities {
  constructor( private storeService: StoreService, private req: RequestService) { }
  hasChamps = true
  hasSummonerIcons = true
  hasMatches = true

  getUserMatches(currentUserAccountId: string): void {
    this.checkIfStoreAsData()

    if (!this.hasMatches) {
      this.req.getAllMatches(currentUserAccountId, 0, 10).then(data => {
        const fullMatchesData: any = data
        const { matches } = fullMatchesData
        this.storeService.updateMyMatches(matches)
      })
    }
  }

  getAllChampions(): void {
    this.checkIfStoreAsData()

    if (!this.hasChamps) {
      this.req.getAllChampions().then(champs => {
        const {data}: any = champs
        this.storeService.updateAllChampions(data)
      })
    }
  }

  getAllSummoners(): void {
    this.checkIfStoreAsData()

    if (!this.hasSummonerIcons) {
      this.req.getAllSummoners().then(summoners => {
        const {data}: any = summoners
        this.storeService.updateAllSummoners(data)
      })
    }
  }

  checkIfStoreAsData(): void {
    console.log('checks');
    
    this.storeService.allChampions$.subscribe(res => {
      if (res) {
        console.log('CHAMPS:', res)
        this.hasChamps = true
      }
    })
    this.storeService.allSummoners$.subscribe(res => {
      if (res) {
        console.log('summoners:', res)
        this.hasSummonerIcons = true
      }
    })
    this.storeService.myMatches$.subscribe(res => {
      if (res) {
        console.log('matches:', res)
        this.hasMatches = true
      }
    })
  }

}
