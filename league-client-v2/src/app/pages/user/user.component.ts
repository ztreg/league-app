import { Component, OnInit } from '@angular/core'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private store: StoreService) { }
  currentUser$ = this.store.currentUser$

  ngOnInit(): void {

  }

}
