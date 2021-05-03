import { Item } from './Player'

export interface TeamStats {
  player: PlayerStats[]
}

interface PlayerStats {
  accountId: string
  championURL: string
  items: Item[]
  name: string
  stats: object
  summoners: object
  timeline: object
}
