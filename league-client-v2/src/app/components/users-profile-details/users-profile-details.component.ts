import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-users-profile-details',
  templateUrl: './users-profile-details.component.html',
  styleUrls: ['./users-profile-details.component.scss']
})
export class UsersProfileDetailsComponent implements OnInit {
  @Input() userData: any
  constructor() { }

  ngOnInit(): void {
    console.log(this.userData)

  }

}
