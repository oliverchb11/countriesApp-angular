import { Component, inject } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  private countriesService = inject(CountriesService);
  public countries: CountryResponse[] = []

  public searchData(name: string): void{
    this.countriesService.searchByCountries(name).subscribe((countries)=> {
      console.log(countries);
      
      this.countries = countries
    })
  }
}
