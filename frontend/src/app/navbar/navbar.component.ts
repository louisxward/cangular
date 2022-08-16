import { Component, OnInit } from '@angular/core';
import { faHouseChimney, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faHouseChimney = faHouseChimney;
  faUsers = faUsers;
  constructor() { }

  ngOnInit(): void {
  }

}