import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() name!: string
  @Input() placeholder: string | undefined
  @Input() val!: any
  @Input() type!: string
  @Output() inputData = new EventEmitter()

  header!: string

  constructor() { }

  ngOnInit(): void {
   this.header = this.capitalize(this.name)
  }

  capitalize(name: string): string {
    return name[0].toUpperCase() + name.slice(1)
  }

  emitInputVal(newVal: any): void {
    this.inputData.emit({
      key: this.name,
      value: newVal
    })
  }
}
