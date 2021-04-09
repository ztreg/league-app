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
  constructor(private req: RequestService) {}

  ngOnInit(): void {
    this.req.getMatchDetails(this.matchId).then(res2 => {
      // console.log(res2)
      this.WOW = res2
      this.test()
    })
  }

  test(): void {
    const itemId = this.WOW.participants[9].stats.item3
    this.req.getItems().then(items => {
      const allItems: any = items

      if (allItems) {
        this.myItems.unshift(allItems.data[itemId])
        this.myItems[0].image = this.itemImageUrl + allItems.data[itemId].image.full
      }

    })
  }
}
