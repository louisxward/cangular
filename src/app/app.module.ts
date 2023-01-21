import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home/home.component';
import { SidebarComponent } from './Sidebar/sidebar/sidebar.component';
import { AboutComponent } from './About/about/about.component';
import { PageHeaderComponent } from './Core/components/page-header/page-header.component';
import { UserTableComponent } from './Users/components/user-table/user-table.component';
import { UsersComponent } from './Users/users/users.component';
import { UserDetailsComponent } from './UserDetails/userDetails/userDetails.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    AboutComponent,
    PageHeaderComponent,
    UsersComponent,
    UserTableComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
