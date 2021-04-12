import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit  {
  accountId = 'UJhJTXVRisEi4S2ASXmhUmDEYhWJIBfPSmMbQdhAfbM'
  allMatches: any

  constructor(private req: RequestService) {}

  ngOnInit(): void {
    this.req.getAllMatches(this.accountId, 0, 10).then(data => {
      const yes: any = data
      console.log(yes.matches);
      
      this.allMatches = yes.matches
    })
  }

}
