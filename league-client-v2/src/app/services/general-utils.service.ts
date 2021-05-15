import { Injectable } from '@angular/core'
import { Item } from '../types/Player'
import { StoreService } from './store.service'
import { take } from 'rxjs/operators'

enum ranks {
  CHALLENGER = 1,
  GRANDMASTER,
  MASTER,
  DIAMOND,
  PLATINUM,
  GOLD,
  SILVER,
  BRONZE,
  UNRANKED
}

export enum emblemsEnum {
  MASTER = '../../assets/images/Emblem_Master.png',
  DIAMOND = '../../assets/images/Emblem_Diamond.png',
  PLATINUM = '../../assets/images/Emblem_Platinum.png',
  GOLD = '../../assets/images/Emblem_Gold.png',
  SILVER = '../../assets/images/Emblem_Silver.png',
  BRONZE = '../../assets/images/Emblem_Bronze.png'
}

enum division {
  I = 1,
  II,
  III,
  IV,
  V
}

@Injectable({
  providedIn: 'root'
})


export class GeneralUtilsService {

  itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/'
  championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/'
  summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/'

  constructor(private store: StoreService) { }

  /**
   *
   * @param arrayToSort the array that should be sorted
   * @returns a array sorted by TIER -> DIVISION -> LEAGUEPOINTS
   */
  sortByRank(arrayToSort: any[]): any {
    this.getDivsionAsNumber(arrayToSort)
    this.getLeagueAsNumber(arrayToSort)

    return arrayToSort.sort((a, b) =>  {
      if (a.stats.tierAsNumber === b.stats.tierAsNumber) {
        if (a.stats.division === b.stats.division) {
          return ( a.stats.leaguePoints > b.stats.leaguePoints ? -1 : 1 )
        }
        return ( a.stats.division < b.stats.division ? -1 : 1 )
      }
      return a.stats.tierAsNumber > b.stats.tierAsNumber ? 1 : -1
    })

  }

  getDivsionAsNumber(array: any): any {
    for (const player of array) {
      player.stats.tierAsNumber = ranks[player.stats.tier]
    }
    return array
  }

  getLeagueAsNumber(array: any): any {
    for (const player of array) {
      player.stats.division = division[player.stats.rank]
    }
    return array
  }

  getRankedEmblems(rank: string): string {
    return emblemsEnum[rank as keyof typeof emblemsEnum]
  }

  /**
   *
   * @param itemsArray An array of items with ids
   * @returns a array of URLS to the images of the items in the array
   */
  getItems(itemsArray: any []): Item[] {
    const itemsURL: Item[] = []
    let itemURL: any = {}
    this.store.allItems$.pipe(take(1)).subscribe(allItems => {
      if (allItems) {
        for (const id of itemsArray) {

          if (id === 0) {
            continue
          }

          itemURL = allItems[id]
          itemsURL.unshift(itemURL)
          itemsURL[0].itemURL = this.itemImageUrl + allItems[id].image.full
        }
      }
    })
    itemsURL.reverse()
    return itemsURL
  }

  /**
   *
   * @param championId The champion we want data from
   * @returns Specific data about the champion that we want for the program.
   * This metadata should be in the store
   */
  getSpecificChampion(championId: string): any {
    const championPlayed: any = {}

    this.store.allChampions$.pipe(take(1)).subscribe(champions => {
      const championsArray: any = Object.entries(champions)
      for (const [key, item] of championsArray) {
        if (championId.toString() === item.key) {
          championPlayed.imageURL = `${this.championImageUrl}${item.image.full}`
        }
      }
    })
    return championPlayed
  }

  /**
   *
   * @param summoner1Id The first summonerspell the user is using
   * @param summoner2Id The second summonerspell the user is using
   * @returns An object of data about the summonerspells
   */
  getSummoners(summoner1Id: string, summoner2Id: string): any {
    const summonerData: any = {}
    this.store.allSummoners$.subscribe(summoners => {
      const summonersArray: any = Object.entries(summoners)
      for (const [key, item] of summonersArray) {
        if (summoner1Id.toString() === item.key) {
          summonerData.summonersURL1 = `${this.summonersURL}${item.image.full}`
        }
        if (summoner2Id.toString() === item.key) {
          summonerData.summonersURL2 = `${this.summonersURL}${item.image.full}`
        }
      }
    })
    return summonerData
  }

  getMostPlayedChampion(test: any): void {

    const mostOccurringElement = (array: { [key: string]: number }[]) => {
      let max = array[0].champion
      const counter: { [key: string]: number } = {}

      for (const item of array) {
        if (!counter[item.champion]) { counter[item.champion] = 0 }
        counter[item.champion]++
        if (counter[max] < counter[item.champion]) { max = item.champion }
      }

      return this.getSplashArtChampion(max.toString())
    }

    return mostOccurringElement(test)
  }

  getSplashArtChampion(championId: string): any {
    const championPlayed: any = {}
    const URL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`

    this.store.allChampions$.pipe(take(1)).subscribe(champions => {
      const championsArray: any = Object.entries(champions)
      for (const [key, item] of championsArray) {
        if (championId.toString() === item.key) {
          const lastString = '_1.jpg'
          championPlayed.imageURL = `${URL}${item.id}${lastString}`
        }
      }
    })
    return championPlayed
  }


  timeDifference(previous: any): any {
      const current = Date.now()
      const msPerMinute = 60 * 1000
      const msPerHour = msPerMinute * 60
      const msPerDay = msPerHour * 24
      const msPerMonth = msPerDay * 30
      const msPerYear = msPerDay * 365

      const elapsed = current - previous

      if (elapsed < msPerMinute) {
          return Math.round(elapsed / 1000) + 's ago'
      }

      else if (elapsed < msPerHour) {
          return Math.round(elapsed / msPerMinute) + 'm ago'
      }

      else if (elapsed < msPerDay ) {
          return Math.round(elapsed / msPerHour ) + 'h ago'
      }

      else if (elapsed < msPerMonth) {
          return Math.round(elapsed / msPerDay) + 'd ago'
      }

      else if (elapsed < msPerYear) {
          return Math.round(elapsed / msPerMonth) + 'months ago'
      }

      else {
          return Math.round(elapsed / msPerYear ) + 'ys ago'
      }
  }

  addTimeStampToNonMetaMatches(matchesArray: any): any {
    for (const match of matchesArray) {
      match.timestamp = this.timeDifference(match.timestamp)
    }
    return matchesArray
  }
}

