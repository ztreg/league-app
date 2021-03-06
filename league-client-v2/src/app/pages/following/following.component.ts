import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  constructor(private store: StoreService) { }
  followingData$ = this.store.followingData$
  currentUser$ = this.store.currentUser$
  ngOnInit(): void {}
}
