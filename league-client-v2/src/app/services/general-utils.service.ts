import { Injectable } from '@angular/core'

enum ranks {
  CHALLENGER = 1,
  GRANDMASTER,
  MASTER,
  DIAMOND,
  PLATINUM,
  GOLD,
  SILVER,
  BRONZE
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

  constructor() { }

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

}

