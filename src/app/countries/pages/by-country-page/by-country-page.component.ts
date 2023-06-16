import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnDestroy , OnInit{

  public loading: boolean = false;
  private countriesService = inject(CountriesService);
  public countries: CountryResponse[] = []
  private subscription?: Subscription;  
  public value: string = ''

  ngOnInit(): void {
 
    this.getDataLocalStorage()
  }

  public searchData(name: string): void{
    this.loading = true;
    this.countriesService.setLocalStorageString('value', name)
    this.countriesService.searchByCountries(name).subscribe((countries)=> {
      console.log(name);
      this.loading = false;
      this.countries = countries
      this.countriesService.setLocalStorage('country', this.countries)
    })
  }

  getDataLocalStorage(): void{
    if(this.countriesService.getLocalStorage('country')){
      this.countries = this.countriesService.getLocalStorage('country');
      this.value = this.countriesService.getLocalStorageString('value')
    }else{
      this.countries = this.countriesService.cacheStorage.byCountries.countries;
      this.value = this.countriesService.cacheStorage.byCountries.term;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.countriesService.removeLocalStorage('country')
   }
}
