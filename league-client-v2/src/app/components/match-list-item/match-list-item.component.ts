import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  imageURL: string;
}

@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.scss']
})
export class MatchListItemComponent implements OnInit {
  @Input() match: any
  @ViewChild(MatPaginator) paginator: MatPaginator | any ;
  itemData: any= []
  displayedColumns: string[] = ['name', 'imageURL'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.itemData);

  title = 'league-client-v2'
  matchId = '5197533187'
  testItemId: string | undefined
  gameData: any
  myItems: any = []
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  userName: string | undefined


  constructor(private req: RequestService) {}

  ngOnInit(): void {
    console.log(this.match.gameId);
    
    this.req.getMatchDetails(this.match.gameId).then(res2 => {
      this.gameData = res2
      console.log(this.gameData);
      const currentUserAccountId = this.req.accountId

      for(let participant of this.gameData.participantIdentities) {
        if(participant.player.accountId === currentUserAccountId) {
          this.userName = participant.player.summonerName
        }
      }
      
      this.getItemsData()
      this.dataSource.paginator = this.paginator;
    })
  }

  getItemsData(): void {
    const {item0, item1, item2, item3, item4, item5, item6} = this.gameData.participants[9].stats
    const myItems = [item0, item1, item2, item3, item4, item5, item6]
    this.req.getItems().then(items => {
      const allItems: any = items

      if (allItems) {
        for (const id of myItems) {
          if (id === 0) {
            continue
          }
          this.myItems.unshift(allItems.data[id])
          this.itemData.unshift(allItems.data[id])
          this.myItems[0].image = this.itemImageUrl + allItems.data[id].image.full
          this.itemData[0].imageURL = this.myItems[0].image
        }
      }

    })
  }

}
