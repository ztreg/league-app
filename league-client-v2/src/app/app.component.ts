import { Component, OnInit } from '@angular/core';
import { RequestService } from './services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'league-client-v2'
  matchId = '5197533187'
  testItemId: string | undefined
  WOW: any
  myItems: any = []
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  userName: string | undefined
  constructor(private req: RequestService) {}

  ngOnInit(): void {
    this.req.getMatchDetails(this.matchId).then(res2 => {
      // console.log(res2)
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
