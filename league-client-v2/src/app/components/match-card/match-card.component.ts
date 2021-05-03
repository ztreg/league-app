import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { lowerFirst } from 'cypress/types/lodash'

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() teamInfo: any
  sortedTeam: any = {}
  sorted = false
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.teamInfo) {
      this.sortedTeam.Players = []

      let index = 0
      for (const player of this.teamInfo.Players) {

        const {lane, role} = player.timeline
        this.sortedTeam.Players[index] = player
        // TODO: Bugfix roles, sometimes they are not correct
        // switch (lane) {
        //   case 'TOP':
        //     // console.log('top here')

        //     this.sortedTeam.Players[0] = player
        //     break
        //   case 'JUNGLE':
        //     // console.log('jungle here')
        //     this.sortedTeam.Players[1] = player
        //     break
        //   case 'MIDDLE':
        //     // console.log('mid here')

        //     this.sortedTeam.Players[2] = player
        //     break
        //   case 'BOTTOM':
        //   // console.log('bot here')

        //   if (role === 'DUO_CARRY') {
        //     // console.log('adc here')
        //     player.timeline.lane = 'ADC'
        //     this.sortedTeam.Players[3] = player
        //     }
        //   if (role === 'DUO_SUPPORT') {
        //     // console.log('sup here')
        //     player.timeline.lane = 'SUPPORT'
        //     this.sortedTeam.Players[4] = player
        //     }
        //   break
        //   default:
        //     // console.log('default')


        //     break
        // }
        index++
      }
      this.sorted = true
    } else {
      // console.log('no data')
    }
  }

  redirect(id: string): void {
    this.router.navigate(['/users', id])
  }
}
