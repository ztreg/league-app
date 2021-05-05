import { Component, OnInit } from '@angular/core'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  followingUserIdsArray: string[] | [] | undefined
  followingData$ = this.store.followingData$

  constructor(
    private store: StoreService
    ) { }

  // followingData$ = this.store.followingData$
  ngOnInit(): void {}
}
