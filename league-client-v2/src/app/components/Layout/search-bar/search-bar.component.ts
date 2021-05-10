import { Component, OnInit } from '@angular/core';
import { RequestUtilities } from 'src/app/services/requestUtils';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private reqUtils: RequestUtilities) { }
  searchValue = ''
  ngOnInit(): void {
  }

  searchUser(): void {
    console.log(this.searchValue);
  }
}
