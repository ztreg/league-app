import { Injectable } from '@angular/core'
import { sum } from 'cypress/types/lodash'
import { take, tap } from 'rxjs/operators'
import { GeneralUtilsService } from './general-utils.service'
import { RequestService } from './request.service'
import { StoreService } from './store.service'

/**
 * This file serves as my "Controller" if you follow the MVC structure
 */
@Injectable({
  providedIn: 'root'
})
export class RequestUtilities {
  constructor( private storeService: StoreService, private req: RequestService, private generalUtils: GeneralUtilsService) { }
  hasChamps: boolean | undefined
  hasSummonerIcons: boolean | undefined
  hasMatches: boolean | undefined
  hasItemsData: boolean | undefined
  currentUserID: string | undefined

  test: boolean | undefined

  async getMyUserMatches(currentUserAccountId: string, start: number | 0, end: number | 10): Promise<any> {
    let res
    this.storeService.myMatches$.pipe(tap(x => console.log('log my stuff', x)))
    this.storeService.myMatches$.pipe(tap(myMatches => {
      if (myMatches) {
        console.log('yaas')

        this.test = true
      }
    }))
    if (!this.test) {
      res = await this.req.getAllMatches(currentUserAccountId, start, end)
      const fullMatchesData: any = res
      const { matches } = fullMatchesData
      this.storeService.updateMyMatches(matches)
      this.hasMatches = true

    }
    return res
  }

  async getUserMatches(accountId: string, start: number, end: number): Promise<any> {
    this.storeService.currentUser$.pipe(take(1)).subscribe(currentUser => {
      this.currentUserID = currentUser.accountId
    })

    const result: any = await this.req.getAllMatches(accountId, start || 0, end || 5)
    const { matches } = result
    this.storeService.updateProfileMatches(matches)

}

  getAllChampions(): void {
    this.checkIfStoreAsData()

    if (!this.hasChamps) {
      console.log('getting summoners data')
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
      const summonerInfo: any = await this.req.getUserInfoByName(userObject.summonerName)
      summonerInfo.userDetails = loggedInStatus
      summonerInfo.profileIconId = `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${summonerInfo.profileIconId}.png`
      sessionStorage.setItem('token', loggedInStatus.token)
      sessionStorage.setItem('user', JSON.stringify(summonerInfo))

      this.storeService.updateCurrentUser(summonerInfo)
      await this.getMyUserMatches(summonerInfo.accountId, 0, 10)
      return 'OK'
    } catch (error) {
      console.log(error)

      return error
    }

  }

  async getUserDataByID(accountId: string): Promise<any> {
    try {
      const summonerInfo: any = await this.req.getUserInfoByID(accountId)
      summonerInfo.profileIconId = `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${summonerInfo.profileIconId}.png`
      const {id} = summonerInfo
      const rankedInfo = await this.req.getUserRankedInfo(id)
      // const dataFromAnotherSite = await this.req.testing(summonerInfo.summonerName)
      // console.log(dataFromAnotherSite)

      const data = {
        summonerInfo,
        rankedInfo
      }

      return data

    } catch (error) {
      console.log(error)

    }
  }

  async followUser(accountId: string, currentUser: string): Promise<any> {
    try {
      const result: any = await this.req.followUser(accountId, currentUser)
      if (result.status === 200) {
        this.storeService.updateFollowingData(accountId)
      }
      console.log(result)
      return result

    } catch (error) {
      console.log(error)
      return error
    }
  }

  async fillFollowerDataToStore(): Promise<any> {
    let test = {}
    this.storeService.currentUser$.subscribe(userData => {
      const followingUserIdsArray = userData.userDetails.following || []
      if (followingUserIdsArray.length > 0) {
        test = this.getMatchesByFollowed(followingUserIdsArray)
      }
    })
    return test
  }

  async getMatchesByFollowed(followingArray: string[]): Promise<any> {
    const soloBoard = []
    const flexBoard = []
    for (const id of followingArray) {
      const res: any = await this.getUserDataByID(id)

      for (const rankedMatch of res.rankedInfo) {
        const {tier, rank, leaguePoints, wins, losses} = rankedMatch
        const user = {
          name: res.summonerInfo.name,
          stats: {tier, rank, leaguePoints, wins, losses}
        }
        if (rankedMatch.queueType === 'RANKED_FLEX_SR' ) {
          flexBoard.unshift(user)
        } else {
          soloBoard.unshift(user)
        }
      }
    }
    const leagues = {
      usersSolo: await this.generalUtils.sortByRank(soloBoard),
      usersFlex: await this.generalUtils.sortByRank(flexBoard)
    }
    this.storeService.updateFollowingData(leagues)
    return leagues

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
