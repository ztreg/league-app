export interface Player {
    name: string
    stats: object
    items: Item[]
    timeline: Timeline
    summoners: Summoners
    accountId: string,
    win?: boolean,
    kda?: any
    timeAgo?: string
}

export interface Players {
  Players: Player[]
}

export interface Summoners {
  summonersURL1: string
  summonersURL2: string
}
export interface Item {
  itemURL: string
}

export interface Timeline {
    role: string
    lane: string
    championID?: any
    gameType?: string,
    isRanked?: boolean
}
