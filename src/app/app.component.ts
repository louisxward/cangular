import { ApplicationRef, Component } from '@angular/core';
import { SidebarComponent } from './Sidebar/sidebar/sidebar.component';

import { Store } from "@ngxs/store";
import { first } from "rxjs/operators";
import { User } from "./Core/state/";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cangular2.0';

  constructor(private store: Store, private appRef: ApplicationRef) {
    this.appRef.isStable.pipe(first((stable) => stable)).subscribe(() => {
      this.store.dispatch(new User.AppLoaded());
    });
  }

}
