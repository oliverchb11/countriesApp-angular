import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit, OnDestroy{

 
  public value: string = '';
  public countries: CountryResponse[] = [];
  public loading: boolean = false;
  private countriesService = inject(CountriesService);
  private subscription?: Subscription;


  ngOnInit(): void {
    console.log();

    this.getDataLocalStorage()
  }

  public searchData(value: string): void{
    this.loading = true;
    this.countriesService.setLocalStorageString('value', value)
    this.subscription = this.countriesService.searchByCapital(value).subscribe((countries: CountryResponse[]) => {
      this.countries = countries;
      this.countriesService.setLocalStorage('capital', this.countries)
      this.loading = false;
    })
  }

  getDataLocalStorage(): void{
    if(this.countriesService.getLocalStorage('capital')){
      this.countries = this.countriesService.getLocalStorage('capital');
      this.value = this.countriesService.getLocalStorageString('value')
    }else{  
      this.countries = this.countriesService.cacheStorage.byCapital.countries
      this.value = this.countriesService.cacheStorage.byCapital.term;
    }
  }


  ngOnDestroy(): void {
   this.subscription?.unsubscribe();
   this.countriesService.removeLocalStorage('capital')
   this.countriesService.removeLocalStorage('value')
  }
}
