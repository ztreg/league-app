import { Component, OnInit } from '@angular/core';
import { RequestUtilities } from 'src/app/services/requestUtils';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit  {
  allMatches: any
  currentUserAccountId!: string
  constructor(private store: StoreService, private utils: RequestUtilities) {}

  ngOnInit(): void {
    this.store.updateCurrentUser({accountId: 'UJhJTXVRisEi4S2ASXmhUmDEYhWJIBfPSmMbQdhAfbM'})
    this.store.currentUser$.subscribe(res => {
      this.currentUserAccountId = res.accountId
    })
    this.utils.getUserMatches(this.currentUserAccountId)
  }

}
