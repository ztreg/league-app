import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) { }
  show = false

  ngOnInit(): void {
    this.router.events.subscribe(changes => {
      if (changes instanceof NavigationEnd) {
        this.show = false
        setTimeout(() => {
          this.show = true
        }, 500)
      }
    })


  }

}
