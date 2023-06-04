import { Component, inject } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {

  public countries: CountryResponse[] = []
  private countriesService = inject(CountriesService);


  public searchData(value: string): void{
    this.countriesService.searchByCapital(value).subscribe((countries: CountryResponse[]) => {
      console.log(countries);
      this.countries = countries;
    })
  }
}
