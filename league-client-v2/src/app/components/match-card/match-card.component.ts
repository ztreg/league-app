import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() teamInfo: any
  sortedTeam: any = {}
  sorted = false
  constructor() { }

  ngOnInit(): void {
    if (this.teamInfo) {
      this.sortedTeam.Players = []

      for (const player of this.teamInfo.Players) {
        let {lane, role} = player.timeline
        switch (lane) {
          case 'TOP':
            this.sortedTeam.Players[0] = player
            break
          case 'JUNGLE':
            this.sortedTeam.Players[1] = player
            break
          case 'MIDDLE':
            this.sortedTeam.Players[2] = player
            break
          case 'BOTTOM':
            if (role === 'DUO_CARRY') {
              player.timeline.lane = 'ADC'
              this.sortedTeam.Players[3] = player
            }
            if (role === 'DUO_SUPPORT') {
              player.timeline.lane = 'SUPPORT'
              this.sortedTeam.Players[4] = player
            }
            break
          default:
            break
        }
      }
      this.sorted = true
    } else {
      console.log('no data')
    }
  }
}
