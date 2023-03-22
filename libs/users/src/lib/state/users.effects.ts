import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, concatMap, map, of } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/Users.service';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
   
  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      if(this.localstorageService.isValidToken()){
        const userId = this.localstorageService.getUserIdFromToken();
        if (userId) {
          return this.usersService.getUser(userId).pipe(map((user) => {
            return UsersActions.buildUserSessionSuccess({ user: user })
          }),
            catchError(() => of(UsersActions.buildUserSessionFailed()))
          );
        }
        else {
          return of(UsersActions.buildUserSessionFailed())
        }
      } else {
        return of(UsersActions.buildUserSessionFailed())
      }
    })
  ))

  constructor(private actions$:Actions,private localstorageService :LocalstorageService,private usersService : UsersService){}
}
function isvalidToken() {
  throw new Error('Function not implemented.');
}

