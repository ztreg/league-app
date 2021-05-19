import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { from } from 'rxjs'
import { RequestUtilities } from 'src/app/services/requestUtils'

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  constructor(private router: ActivatedRoute, private utils: RequestUtilities) { }
  userData: any
  errorMsg = ''
  ngOnInit(): void {
    this.getUserDataById()
  }
  async getUserDataById(): Promise<void> {
    const accountId = this.router.snapshot.paramMap.get('id')
    if (accountId) {
      const res = await this.utils.getUserDataByID(accountId)
      console.log(res)

      if (!res || (res && res.error) ) {
        this.errorMsg = 'Invalid userId'
      } else {
        this.userData = res
      }
    }
  }
}
