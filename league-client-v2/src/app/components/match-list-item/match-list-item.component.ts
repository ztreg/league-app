import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';

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
  displayedColumns: string[] = ['champion', 'name', 'imageURL'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.itemData);

  playedChamp = ''

  title = 'league-client-v2'
  matchId = '5197533187'
  testItemId: string | undefined
  gameData: any
  myItems: any = []
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  userName: string | undefined

  myPartId = 0
  playedChampion: any

  constructor(private req: RequestService, private store: StoreService) {}

  ngOnInit(): void {
    this.req.getMatchDetails(this.match.gameId).then(res2 => {
      this.gameData = res2
      const currentUserAccountId = this.req.accountId
      // console.log(this.gameData);
      
      for(let participant of this.gameData.participantIdentities) {
        if(participant.player.accountId === currentUserAccountId) {
          this.myPartId = participant.participantId
          this.store.updateCurrentUser({
            accountId: currentUserAccountId, 
            username: participant.player.summonerName
          })
          
        }
      }
      
      this.getItemsData()
      this.dataSource.paginator = this.paginator;
    })
  }

  getItemsData(): void {
    const {item0, item1, item2, item3, item4, item5, item6} = this.gameData.participants[this.myPartId - 1].stats
    const {championId} = this.gameData.participants[this.myPartId - 1]
    this.getChampionDetails(championId)


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
    this.store.allChampions$.subscribe(champions => {
      // console.log(champions);
      const championsArray: any = Object.entries(champions)
      for(const [key, item] of championsArray) {
        if(championId == item.key) {
          this.playedChampion = item
        }
      }
      })
  }

  getChampionDetails(championId: string): void {
    
    // test.subscribe(xd => {
    //   console.log(xd);
      
    // })
    
  }

}
