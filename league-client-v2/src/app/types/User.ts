export interface User {
  rankedInfo: RankedInfo[],
  summonerInfo: SummonerInfo
}

export interface SummonerInfo {
  accountId: string
  favoriteChampUrl?: string
  id: string
  name: string
  profileIconId?: string
  puuid: string
  revisionDate: string
  summonerLevel: number
}

export interface RankedInfo {
  freshBlood: boolean
  hotStreak: boolean
  inactive: boolean
  leagueId: string
  leaguePoints: number
  losses: number
  queueType: string
  rank: string
  summonerId: string
  summonerName: string
  tier: string
  veteran: boolean
  wins: number
}
