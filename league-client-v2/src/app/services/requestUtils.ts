import { Injectable } from '@angular/core'
import { sum } from 'cypress/types/lodash'
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

  getMyUserMatches(currentUserAccountId: string, start: number | 0, end: number | 10): void {
      this.req.getAllMatches(currentUserAccountId, start, end).then(data => {
        const fullMatchesData: any = data
        const { matches } = fullMatchesData
        this.storeService.updateMyMatches(matches)
        this.hasMatches = true
      })
  }

  async getUserMatches(accountId: string, start: number, end: number): Promise<any> {
    const result: any = await this.req.getAllMatches(accountId, start || 0, end || 5)
    const { matches } = result
    return matches
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
    const summonerInfo: any = await this.req.getUserInfoByName(summonerName)
    if (summonerInfo) {
      await this.req.signUp(userObject)
    } else {
      console.log('user doest exist exist')
    }
  }

  async login(userObject: any): Promise<any> {
    try {
      const loggedInStatus: any = await this.req.login(userObject)
      // console.log(loggedInStatus)

      const summonerInfo: any = await this.req.getUserInfoByName(userObject.summonerName)
      summonerInfo.userDetails = loggedInStatus
      summonerInfo.profileIconId = `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${summonerInfo.profileIconId}.png`
      console.log(summonerInfo)
      sessionStorage.setItem('token', loggedInStatus.token)
      sessionStorage.setItem('user', JSON.stringify(summonerInfo))

      this.storeService.updateCurrentUser(summonerInfo)
      return 'OK'
    } catch (error) {
      console.log(error)

      return error
    }

  }

  async getUserDataByID(accountId: string): Promise<any> {
    try {
      const summonerInfo: any = await this.req.getUserInfoByID(accountId)
      // console.log(summonerInfo)

      summonerInfo.profileIconId = `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${summonerInfo.profileIconId}.png`
      const {id} = summonerInfo
      const rankedInfo = await this.req.getUserRankedInfo(id)
      // console.log(rankedInfo)

      const data = {
        summonerInfo,
        rankedInfo
      }
      // console.log(data)

      return data

    } catch (error) {
      console.log(error)

    }
  }

  async followUser(accountId: string, currentUser: string): Promise<any> {
    try {
      const result: any = await this.req.followUser(accountId, currentUser)
      console.log(result)
      return result

    } catch (error) {
      console.log(error)
      return error
    }
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
