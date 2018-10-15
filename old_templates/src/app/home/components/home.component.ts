import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [{
      label: 'Admin',
      items: [
         {label: 'Users', routerLink: ['/user'], icon: 'fa-plus'},
          {label: 'Marinas', routerLink: ['/marina'], icon: 'fa-plus'},
          {label: 'Rental Types', routerLink: ['/rentaltype'], icon: 'fa-download'},
          {label: 'Contract Templates', routerLink: ['/contracttemplate'], icon: 'fa-download'}
      ]
  },
  ];
  }

}
