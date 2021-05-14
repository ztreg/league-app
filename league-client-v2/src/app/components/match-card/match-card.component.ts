import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { lowerFirst } from 'cypress/types/lodash'
import { first, map, take, tap } from 'rxjs/operators'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() teamInfo: any
  @Input() gameMetaData: any
  sortedTeam: any = {}
  sorted = false
  currentUser = ''
  championURL = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/'

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
      console.log(this.gameMetaData)

      this.store.currentUser$.pipe(take(1)).subscribe(res => {
        this.currentUser = res.accountId
      })
      this.sorted = true
    }
  }

  redirect(id: string): void {
    this.router.navigate(['/users', id])
  }
}
