import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() teamData: any
  constructor() { }

  ngOnInit(): void {
    console.log(this.teamData);
    
  }

}
