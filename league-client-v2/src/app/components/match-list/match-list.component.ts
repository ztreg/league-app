import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {
  allMatches: any = []
  constructor(private ref: ChangeDetectorRef, private store: StoreService) { }

  ngOnInit(): void {
    this.store.myMatches$.subscribe(matches => {
      this.allMatches = matches
    })
  }

}
