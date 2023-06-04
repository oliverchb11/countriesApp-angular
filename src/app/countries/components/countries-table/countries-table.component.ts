import { Component, Input, inject } from '@angular/core';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.css']
})
export class CountriesTableComponent {

  private router = inject(Router)
  @Input() public countries: CountryResponse[] = [];

  public onRediiectCountry(code: string): void{
    this.router.navigateByUrl(`countries/by/${code}`)
  }
}
