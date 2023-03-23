import { Component, OnInit } from '@angular/core';
import { AuthService, UsersService } from '@deepbits/users';
import { Observable, Subject, takeUntil, timer } from 'rxjs';


@Component({
  selector: 'mykart-nav',
  templateUrl: './nav.component.html',
  styles: [],
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UsersService) { }
  name: any = null;
  islog = false;
  unsubscribe$: Subject<any> = new Subject();
  
  ngOnInit(): void {
    
      this.getdata();
    
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering

  ngOnDestroy() {
    //this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  logoutUser() {
    this.authService.logout();
    this.islog = false;
    this.name = null;
  }
  getdata() {
    this.userService.observeCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      if (user) {
        this.islog = true;
        this.name=user.name;
      }
    });
  }
}
