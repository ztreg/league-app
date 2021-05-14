import { Injectable } from '@angular/core'
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

  hasMetaData: boolean | undefined

  /**
   * Gets the loggedin users latest matches. Destructs the meta-data, stores the meta-data in store
   * and calculates the most played champion of those games. Adds that to the currentUser store.
   * @param currentUserAccountId id the person logged in
   * @param start startindex of matches
   * @param end endindex if matches
   */
  async getMyUserMatches(currentUserAccountId: string, start: number | 0, end: number | 5): Promise<any> {
    let placeHolderFavoriteChampion: any = {}
    this.storeService.myMatches$.pipe(take(1)).subscribe(metaDatamyMatches => {
      if (metaDatamyMatches) {
        console.log('already has matches')

        this.hasMetaData = true
      }
    })
    if (!this.hasMetaData) {
      try {
        const res = await this.req.getAllMatches(currentUserAccountId, start, end)
        const fullMatchesData: any = res
        const { matches } = fullMatchesData
        placeHolderFavoriteChampion = this.generalUtils.getMostPlayedChampion(matches)
        for (const match of matches) {
          match.timestamp = this.generalUtils.timeDifference(match.timestamp)
        }
        this.storeService.updateMyMatches(matches)
        this.hasMatches = true
      } catch (error) {
        console.log(error)

      }
      let empty: any = {}
      this.storeService.currentUser$.pipe(take(1)).subscribe(myData => {
        empty = myData
      })
      empty.favChamp = placeHolderFavoriteChampion
      this.storeService.updateCurrentUser(empty)
    }
  }

  async getUserMatches(accountId: string, start: number, end: number): Promise<any> {
    const result: any = await this.req.getAllMatches(accountId, start || 0, end || 5)
    const { matches } = result
    for (const match of matches) {
      match.timestamp = this.generalUtils.timeDifference(match.timestamp)
    }
    const favChamp = this.generalUtils.getMostPlayedChampion(matches)
    this.storeService.updateProfileMatches(matches)
    return favChamp
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

  getAllItemsData(): void {
    this.checkIfStoreAsData()

    if (!this.hasItemsData) {
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
      const res = await this.req.signUp(userObject)
      const result: any = await this.req.followUser(summonerInfo.accountId, res._id)
      console.log(result)

    } else {
    }
  }

  async login(userObject: any): Promise<any> {
    try {
      const loggedInStatus: any = await this.req.login(userObject)
      const summonerInfo: any = await this.req.getUserInfoByName(userObject.summonerName)
      summonerInfo.userDetails = loggedInStatus
      summonerInfo.profileIconId = `https://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${summonerInfo.profileIconId}.png`
      sessionStorage.setItem('token', loggedInStatus.token)
      sessionStorage.setItem('user', JSON.stringify(summonerInfo))
      this.storeService.updateCurrentUser(summonerInfo)
      await this.getMyUserMatches(summonerInfo.accountId, 0, 5)
      return 'OK'
    } catch (error) {
      console.log(error)

      return error
    }

  }

  async getUserDataByID(accountId: string): Promise<any> {
    try {
      const summonerInfo: any = await this.req.getUserInfoByID(accountId)
      summonerInfo.profileIconId = `https://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${summonerInfo.profileIconId}.png`
      const {id} = summonerInfo
      const rankedInfo = await this.req.getUserRankedInfo(id)
      const data = {
        summonerInfo,
        rankedInfo
      }

      return data

    } catch (error) {
      console.log(error)

    }
  }

  async getUserDataByName(summonerName: string): Promise<any> {
    try {
      const summonerInfo: any = await this.req.getUserInfoByName(summonerName)
      return summonerInfo
    } catch (error) {
      console.log(error)
      return error
    }
  }

  /**
   * @param accountId ID of the person you want to follow
   * @param currentUser ID of the person who is logged in
   * @returns Result or Error
   */
  async followUser(accountId: string, currentUser: string): Promise<any> {

    try {
      const result: any = await this.req.followUser(accountId, currentUser)
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
      if (res.rankedInfo.length === 0) {
        res.rankedInfo = [
          {
            queueType: 'RANKED_FLEX_SR',
            tier: 'UNRANKED',
            wins: '0',
            losses: '0',
            id: res.rankedInfo.id,
          },
          {
            tier: 'UNRANKED',
            wins: '0',
            losses: '0',
            id: res.rankedInfo.id,
          }
        ]
      }
      for (const rankedMatch of res.rankedInfo) {
        const {tier, rank, leaguePoints, wins, losses} = rankedMatch
        const user = {
          name: res.summonerInfo.name,
          stats: {tier, rank, leaguePoints, wins, losses, id}
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
