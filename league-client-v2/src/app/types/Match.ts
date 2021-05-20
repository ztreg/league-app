export interface MatchShort {
  champion: number
  gameId: string
  lane: string
  platformId: string
  queue: number
  role: string
  season: number
  timestamp: string
}

export interface GameMetaData {
  blueside: object
  redside: object
  teamId?: number
}

export interface MatchesMetaData {
  status?: any
  endIndex: number
  matches: MatchShort[]
  startIndex: number
  totalGames: number
  gameId: string
  champion: number
}
