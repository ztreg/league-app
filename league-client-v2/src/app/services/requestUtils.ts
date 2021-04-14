import { Injectable } from '@angular/core'
import { RequestService } from './request.service'
import { StoreService } from './store.service'

@Injectable({
  providedIn: 'root'
})
export class RequestUtilities {
  constructor( private storeService: StoreService, private req: RequestService) { }

  getUserMatches(currentUserAccountId: string): any {
    this.req.getAllMatches(currentUserAccountId, 0, 10).then(data => {
      const fullMatchesData: any = data
      const { matches } = fullMatchesData
      this.storeService.updateMyMatches(matches)
      
    })
  }

  getAllChampions(): void {
    this.req.getAllChampions().then(champs => {
      const {data}: any = champs
      this.storeService.updateAllChampions(data)
    })
  }

  
}
