import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/Core/state/user/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private store: Store) {}

  getId(): Observable<String | null> {
    return this.store.select(UserState.getId)
  }
}
