import { Component, OnInit } from '@angular/core';
import { RequestUtilities } from 'src/app/services/requestUtils';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit  {

  constructor(private store: StoreService, private utils: RequestUtilities) {}

  ngOnInit(): void {
  }

}
