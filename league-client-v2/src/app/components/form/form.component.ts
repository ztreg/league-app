import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit } from '@angular/core';
import { RequestUtilities } from 'src/app/services/requestUtils';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
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
    console.log(this.user);
    this.utils.signUp(this.user)
  }

}
