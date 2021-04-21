import { StringMap } from '@angular/compiler/src/compiler_facade_interface'
import { Component, Input, OnInit } from '@angular/core'
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

  constructor(private utils: RequestUtilities) { }

  ngOnInit(): void {
  }

  handleEventData(inputData: StringMap): void {
    this.user[inputData.key] = inputData.value
  }

  submitForm(event: Event): void {
    event.preventDefault()
    console.log(this.user)
    this.utils.signUp(this.user)
  }

  async loginForm(event: Event): Promise<void> {
    event.preventDefault()
    const res = await this.utils.login(this.user)
    console.log(res)

    if (res.error) {
      this.errorMsg = res.error.msg
    }
  }
}
