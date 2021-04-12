import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {
  @Input() allMatches: any = []
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.allMatches);
    this.ref.detectChanges()
  }

}
