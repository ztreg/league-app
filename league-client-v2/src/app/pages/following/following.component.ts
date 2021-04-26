import { Component, OnInit } from '@angular/core'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  constructor(
    private store: StoreService,
    private utils: RequestUtilities
    ) { }

  ngOnInit(): void {
  }

}
