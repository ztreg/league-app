export interface Player {
    name: string
    championURL: string
    stats: object
    items: Item[]
    timeline: Timeline
    summoners: Summoners
    accountId: string,
    win?: boolean,
    kda?: any
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
}
