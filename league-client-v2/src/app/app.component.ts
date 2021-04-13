import { Component, OnInit } from '@angular/core';
import { RequestUtilities } from './services/requestUtils';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private utils: RequestUtilities, private store: StoreService) {}

  ngOnInit(): void {
    this.utils.getAllChampions()
    // this.store.allChampions$.subscribe(hasChampions => {
      
    // })
  }
}
