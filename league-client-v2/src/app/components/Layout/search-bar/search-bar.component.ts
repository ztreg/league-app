import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUtilities } from 'src/app/services/requestUtils';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private utils: RequestUtilities, private router: Router) { }
  searchSummonerValue = ''
  ngOnInit(): void {
  }
  async searchSummoner(): Promise<void> {
    if(this.searchSummonerValue.length > 0) {
      const res = await this.utils.getUserDataByName(this.searchSummonerValue)
      console.log(res);
      if(res && res.accountId) {
        this.router.navigate(['/users', res.accountId])
      }
    }
    
  }

}
