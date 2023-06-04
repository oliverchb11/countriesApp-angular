import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  public routes = [
    // {
    //   ruta: '',
    //   title: 'Home Page'
    // },
    // {
    //   ruta: 'about',
    //   title: 'About Page'
    // },
    // {
    //   ruta: 'contact',
    //   title: 'Contact Page'
    // },
    {
      ruta: 'countries/by-capital',
      title: 'By Capital'
    },
    {
      ruta: 'countries/by-country',
      title: 'By Country'
    },
    {
      ruta: 'countries/by-region',
      title: 'By Region'
    },
  ]
}
