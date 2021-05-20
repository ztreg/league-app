import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'
import { User } from 'src/app/types/User'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: User | undefined
  errorMsg = false
  constructor(
    private utils: RequestUtilities,
    private store: StoreService
  ) { }

  ngOnInit(): void {
    // this.test()
    this.store.currentUser$.subscribe(res => {
      this.getUserDataById(res.accountId)
    })
  }

  async getUserDataById(accountId: string): Promise<void> {
    // TODO: Add currentUser summonerinfo to store?
    if (accountId) {
      const res = await this.utils.getUserDataByID(accountId)
      if (!res || (res && res.error)) {
        this.errorMsg = true
      } else {
        this.userData = res
      }
    }
  }
}
