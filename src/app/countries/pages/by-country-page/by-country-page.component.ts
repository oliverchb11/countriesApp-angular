import { Component, inject, OnDestroy } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnDestroy{
  public loading: boolean = false;
  private countriesService = inject(CountriesService);
  public countries: CountryResponse[] = []
  private subscription?: Subscription;  


  public searchData(name: string): void{
    this.loading = true;
    this.countriesService.searchByCountries(name).subscribe((countries)=> {
      console.log(countries);
      
      this.loading = false;
      this.countries = countries
    })
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
   }
}
