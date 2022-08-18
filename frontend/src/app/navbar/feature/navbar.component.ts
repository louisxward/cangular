import { Component, OnInit } from '@angular/core';
import { faHouseChimney, faUsers } from '@fortawesome/free-solid-svg-icons';;

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbarMain">
        <a class="link" routerLink="home"><i class="icon"><fa-icon [icon]="faHouseChimney"></fa-icon></i></a>
        <a class="link" routerLink="users"><i class="icon"><fa-icon [icon]="faUsers"></fa-icon></i></a>
    </div>
  `,
  styles: [`
    //Colours
    $navbar-bg-color: #0D6EFD;
    $navbar-item-hover: #3437b3;
    $navbar-item-active: #2c2f9e;
    
    //Navbar
    .navbarMain {
      color: white;
      background-color: $navbar-bg-color;
      float: left;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      transition: 0.3s ease;
      display: flex;
      flex-direction: column;
      width: 4%;
      box-shadow: 0 0 5px rgba(black, 0.5);;

    }
    
    
    //Links
    .link {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        font-weight: 400;
        user-select: none;
        margin: 0.1em 0;
        padding: 0.4em;
        height: 1.5em;
        color: white;
        text-decoration: none;
        margin-bottom: 10px;
        height: 50px;
      }
      .link:hover {
        /* background-color: $navbar-item-hover; */
        background: rgba(0, 0, 0, 0.2);
      }
      .link.active {
        /* background-color: $navbar-item-active; */
        background: rgba(0, 0, 0, 0.2);
      }
    
      .link .icon {
        text-align: center;
        margin: 0.1em;
        margin-left: auto;
        margin-right: auto;
      }
      `
  ]
})



export class NavbarComponent implements OnInit {

  faHouseChimney = faHouseChimney;
  faUsers = faUsers;

  constructor() { }

  ngOnInit(): void {
  }

}
