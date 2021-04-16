export interface Player {
    name: string
    championURL: string
    stats: object
    items: Item[]
    timeline: Timeline
}

export interface Players {
  Players: Player[]
}

export interface Item {
  itemURL: string
}

export interface Timeline {
    role: string
    lane: string
}
