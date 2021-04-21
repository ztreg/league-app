import { Injectable } from '@angular/core'
import { RequestService } from './request.service'
import { StoreService } from './store.service'

/**
 * This file serves as my "Controller" if you follow the MVC structure
 */
@Injectable({
  providedIn: 'root'
})
export class RequestUtilities {
  constructor( private storeService: StoreService, private req: RequestService) { }
  hasChamps: boolean | undefined
  hasSummonerIcons: boolean | undefined
  hasMatches: boolean | undefined
  hasItemsData: boolean | undefined

  getUserMatches(currentUserAccountId: string, start: number, end: number): void {
      this.req.getAllMatches(currentUserAccountId, start, end).then(data => {
        console.log(data);
        
        const fullMatchesData: any = data
        const { matches } = fullMatchesData
        this.storeService.updateMyMatches(matches)
        this.hasMatches = true
      })
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
      console.log('getting sums data')

      this.req.getAllSummoners().then(summoners => {
        const {data}: any = summoners
        this.storeService.updateAllSummoners(data)
      })
    }
  }

  getAllItemsData(): void {
    this.checkIfStoreAsData()

    if (!this.hasItemsData) {
      console.log('getting items data')
      this.req.getItems().then(items => {
        const {data}: any = items
        this.storeService.updateAllItems(data)
      })
    }
  }

  async signUp(userObject: any): Promise<void> {
    const {summonerName} = userObject
    const summonerInfo = await this.req.getUserInfoByName(summonerName)
    if(summonerInfo) {
      const result = await this.req.signUp(userObject)
      console.log(result);
    } else {
      console.log('user doest exist exist');
    }
  }

  async login(userObject: any): Promise<any> {
    const res = await this.req.login(userObject)
    console.log(res);
    
  }


  checkIfStoreAsData(): void {
    this.storeService.allChampions$.subscribe(res => {
      if (res) {
        this.hasChamps = true
      } else {
        this.hasChamps = false
      }
    })
    this.storeService.allSummoners$.subscribe(res => {
      if (res) {
        this.hasSummonerIcons = true
      } else {
        this.hasSummonerIcons = false
      }
    })
    this.storeService.myMatches$.subscribe(res => {
      if (res) {
        this.hasMatches = true
      }
      else {
        this.hasMatches = false
      }
    })
    this.storeService.allItems$.subscribe(res => {
      if (res) {
        this.hasItemsData = true
      }
      else {
        this.hasItemsData = false
      }
    })
  }

}
