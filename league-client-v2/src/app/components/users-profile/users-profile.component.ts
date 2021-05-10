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
  ngOnInit(): void {
    this.getUserDataById()
    console.log('yoo')

  }
  async getUserDataById(): Promise<void> {
    const accountId = this.router.snapshot.paramMap.get('id')
    console.log(accountId)
    if (accountId) {
      this.userData = await this.utils.getUserDataByID(accountId)
    }
  }
}
