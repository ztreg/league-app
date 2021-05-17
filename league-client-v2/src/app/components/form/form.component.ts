import { StringMap } from '@angular/compiler/src/compiler_facade_interface'
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
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
  statusMsg: string | undefined
  user: any = {
    summonerName: '',
    password: ''
  }

  constructor(private utils: RequestUtilities, private router: Router, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  handleEventData(inputData: StringMap): void {
    this.user[inputData.key] = inputData.value
  }

  async signUp(event: Event): Promise<void> {
    event.preventDefault()
    if (this.user.summonerName === '') {
      this.errorMsg = 'Please enter a name...'
    } else {
      const signUpRes = await this.utils.signUp(this.user)
      if (signUpRes.error || signUpRes.status) {
        this.statusMsg = signUpRes.status.message || signUpRes.error.status.message
      } else {
        this.statusMsg = 'Signup successfull. Login to start following!'
      }
    }
  }

  async loginForm(event: Event): Promise<void> {
    event.preventDefault()
    if (this.user.summonerName === '') {
      this.errorMsg = 'Please enter a name...'
    } else {
      const res = await this.utils.login(this.user)
      if (res.error) {
        this.errorMsg = res.error.msg
      } else {
        this.router.navigate(['/matches'])
        this.utils.fillFollowerDataToStore()
      }
    }
  }
}
