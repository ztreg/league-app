import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RequestUtilities } from 'src/app/services/requestUtils'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any

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
    console.log(accountId)
    if (accountId) {
      this.userData = await this.utils.getUserDataByID(accountId)
    }
  }

    // async test(): Promise<void> {
    //   console.log('yo')

    //   const result = await fetch('https://euw.op.gg/summoner/userName=Ztreg', {
    //     method: 'GET',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*'
    //     },
    //     mode: 'cors'
    //   })
    //   .then(response => console.log(response))
    //   .then(json => console.log(json))
    //   .catch (err => console.log(err))

    //   console.log(result)
    // }

}
