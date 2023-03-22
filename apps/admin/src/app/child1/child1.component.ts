import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'deepbits-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss'],
})
export class Child1Component {
  @Input() email: string;
  name: string;
  password: string;
  constructor(private formBuilder: FormBuilder){}
  login() {
    this.name = "de";
  }
}
