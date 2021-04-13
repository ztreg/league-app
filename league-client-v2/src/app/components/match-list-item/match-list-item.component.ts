import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.scss']
})
export class MatchListItemComponent implements OnInit {
  @Input() match: any
  title = 'league-client-v2'
  matchId = '5197533187'
  testItemId: string | undefined
  WOW: any
  myItems: any = []
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  userName: string | undefined
  constructor(private req: RequestService) {}

  ngOnInit(): void {
    console.log(this.match.gameId);
    
    this.req.getMatchDetails(this.match.gameId).then(res2 => {
      console.log(res2)
      this.WOW = res2
      this.test()
    })
  }

  test(): void {
    const {item0, item1, item2, item3, item4, item5, item6} = this.WOW.participants[9].stats
    const {summonerName} = this.WOW.participantIdentities[9].player
    this.userName = summonerName

    const myItems = [item0, item1, item2, item3, item4, item5, item6]

    this.req.getItems().then(items => {
      const allItems: any = items

      if (allItems) {
        for (const id of myItems) {
          if (id === 0) {
            continue
          }
          this.myItems.unshift(allItems.data[id])

          this.myItems[0].image = this.itemImageUrl + allItems.data[id].image.full
        }
      }

    })
  }

}
