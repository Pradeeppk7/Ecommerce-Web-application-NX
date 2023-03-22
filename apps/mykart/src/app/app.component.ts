import { Component, OnInit } from '@angular/core';
import { UsersService } from '@deepbits/users';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'deepbits-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {
    
  }
  ngOnInit(): void {
    this.usersService.initAppSession();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  title = 'mykart';
}
