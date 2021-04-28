import { Component, Input, OnInit } from '@angular/core'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-users-profile-details',
  templateUrl: './users-profile-details.component.html',
  styleUrls: ['./users-profile-details.component.scss']
})
export class UsersProfileDetailsComponent implements OnInit {
  @Input() userData: any
  constructor(private utils: RequestUtilities, private store: StoreService) { }
  profileMatches$ = this.store.profileMatches$

  ngOnInit(): void {
    console.log(this.userData)
    this.utils.getUserMatches(this.userData.summonerInfo.accountId, 0, 5)

  }

}
