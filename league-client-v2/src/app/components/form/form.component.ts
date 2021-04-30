import { StringMap } from '@angular/compiler/src/compiler_facade_interface'
import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RequestUtilities } from 'src/app/services/requestUtils'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() page!: string
  errorMsg: string | undefined
  user: any = {
    summonerName: '',
    password: ''
  }

  constructor(private utils: RequestUtilities, private router: Router) { }

  ngOnInit(): void {
  }

  handleEventData(inputData: StringMap): void {
    this.user[inputData.key] = inputData.value
  }

  submitForm(event: Event): void {
    event.preventDefault()
    this.utils.signUp(this.user)
  }

  async loginForm(event: Event): Promise<void> {
    event.preventDefault()
    const res = await this.utils.login(this.user)
    if (res.error) {
      this.errorMsg = res.error.msg
    } else {
      this.router.navigate(['/matches'])
      this.utils.fillFollowerDataToStore()
    }
  }

}
