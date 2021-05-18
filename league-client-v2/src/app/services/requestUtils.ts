import { Injectable } from '@angular/core'
import { take, tap } from 'rxjs/operators'
import { MatchesMetaData } from '../types/Match'
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
  iconURL = 'https://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon'
  /**
   * Gets the loggedin users latest matches. Destructs the meta-data, stores the meta-data in store
   * and calculates the most played champion of those games. Adds that to the currentUser store.
   * @param currentUserAccountId id the person logged in
   * @param start startindex of matches
   * @param end endindex if matches
   */
  async getMyUserMatches(currentUserAccountId: string, start: number | 0, end: number | 5, isPagination: boolean | false): Promise<any> {
    let returnObject: any = {}
    this.storeService.myMatches$.pipe(take(1)).subscribe(metaDatamyMatches => {
      if (metaDatamyMatches) {
        this.hasMetaData = true
      }
    })
    if (!this.hasMetaData || isPagination) {
      let placeHolderFavoriteChampion: any = {}
      try {
        const res: MatchesMetaData = await this.req.getAllMatches(currentUserAccountId, start, end)
        if (res.status && res.status.status_code === 429) {
          return returnObject = res
        }
        const { matches } = res
        console.log('looping.....')

        for (const match of matches) {
          match.timestamp = this.generalUtils.timeDifference(match.timestamp)
        }
        if (isPagination) {
          let oldPagList: any
          this.storeService.pagMetaDataMatches$.pipe(take(1)).subscribe(oldPagMetaData => {
            oldPagList = oldPagMetaData
          })
          this.storeService.updatePagMetaDataMatches(matches)
        } else {
          placeHolderFavoriteChampion = this.generalUtils.getMostPlayedChampion(matches)
          this.storeService.updateMyMatches(matches)
          this.getMyFavChamp(placeHolderFavoriteChampion)
        }
        returnObject = res

      } catch (error) {
        console.log(error)
        returnObject = error
      }
    }
    return returnObject
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

  getMyFavChamp(favChampParam: any): void {
    let emptyUser: any = {}
    this.storeService.currentUser$.pipe(take(1)).subscribe(myData => {
      emptyUser = myData
    })
    emptyUser.favChamp = favChampParam
    this.storeService.updateCurrentUser(emptyUser)
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

  async signUp(userObject: any): Promise<any> {
    const {summonerName} = userObject
    try {
      const summonerInfo: any = await this.req.getUserInfoByName(summonerName)
      console.log(summonerInfo)

      if (!summonerInfo.status) {
        const res = await this.req.signUp(userObject)
        const result: any = await this.req.followUser(summonerInfo.accountId, res._id)
      }
      return summonerInfo
    } catch (error) {
      console.log(error)
      return error
    }

  }

  async login(userObject: any): Promise<any> {
    try {
      const loggedInStatus: any = await this.req.login(userObject)
      const summonerInfo: any = await this.req.getUserInfoByName(userObject.summonerName)
      summonerInfo.userDetails = loggedInStatus
      summonerInfo.profileIconId = `${this.iconURL}/${summonerInfo.profileIconId}.png`
      sessionStorage.setItem('token', loggedInStatus.token)
      sessionStorage.setItem('user', JSON.stringify(summonerInfo))
      this.storeService.updateCurrentUser(summonerInfo)
      await this.getMyUserMatches(summonerInfo.accountId, 0, 5, false)
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
