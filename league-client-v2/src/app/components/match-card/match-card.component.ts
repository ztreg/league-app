import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { lowerFirst } from 'cypress/types/lodash'
import { first, map, tap } from 'rxjs/operators'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() teamInfo: any
  sortedTeam: any = {}
  sorted = false
  constructor(private router: Router, private store: StoreService) { }
  champions$ = this.store.allChampions$.pipe(
    map(data => {
      const hejhej = Object.values(data).map((item: any) => [item.key, item])
      const awsomeDict = Object.fromEntries(hejhej)
      return awsomeDict
    })
  )

  ngOnInit(): void {
    if (this.teamInfo) {
      console.log(this.teamInfo)

      this.sortedTeam.Players = []
      console.log()

      // let index = 0
      // for (const player of this.teamInfo.Players) {

      //   const {lane, role, test} = player.timeline
      //   this.sortedTeam.Players[index] = player
      //   // TODO: Bugfix roles, sometimes they are not correct
      //   // switch (lane) {
      //   //   case 'TOP':
      //   //     this.sortedTeam.Players[0] = player
      //   //     break
      //   //   case 'JUNGLE':
      //   //     this.sortedTeam.Players[1] = player
      //   //     break
      //   //   case 'MIDDLE':

      //   //     this.sortedTeam.Players[2] = player
      //   //     break
      //   //   case 'BOTTOM':

      //   //   if (role === 'DUO_CARRY') {
      //   //     player.timeline.lane = 'ADC'
      //   //     this.sortedTeam.Players[3] = player
      //   //     }
      //   //   if (role === 'DUO_SUPPORT') {
      //   //     player.timeline.lane = 'SUPPORT'
      //   //     this.sortedTeam.Players[4] = player
      //   //     }
      //   //   break
      //   //   default:
      //   //     break
      //   // }
      //   index++
      // }
      this.sorted = true
    } else {
    }
  }

  redirect(id: string): void {
    this.router.navigate(['/users', id])
  }
}
