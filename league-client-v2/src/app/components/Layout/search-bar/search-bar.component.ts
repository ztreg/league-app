import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUtilities } from 'src/app/services/requestUtils';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private reqUtils: RequestUtilities, private router: Router) { }
  searchValue = ''
  errormsg = ''
  ngOnInit(): void {
  }

  async searchUser(): Promise<void> {
    
    if(this.searchValue.length > 0) {
      const res = await this.reqUtils.getUserDataByName(this.searchValue)
      console.log(res);
      if(res.accountId) {
        console.log('navigating to users');
        
        this.router.navigate(['/users', res.accountId])
        window.location.replace(`/users/${res.accountId}`)
      }
      else {
        this.errormsg = 'No user found'
      }
    }

  }
}
