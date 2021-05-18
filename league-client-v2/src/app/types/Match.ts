export interface MatchShort {
  champion: number
  gameId: number
  lane: string
  platformId: string
  queue: number
  role: string
  season: number
  timestamp: number
}

export interface GameMetaData {
  blueside: object
  redside: object
}

export interface MatchesMetaData {
  status?: any
  endIndex: number
  matches: MatchShort[]
  startIndex: number
  totalGames: number
}
