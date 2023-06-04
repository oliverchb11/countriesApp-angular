import { Component, inject, OnDestroy } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnDestroy{
 

  public countries: CountryResponse[] = [];
  public loading: boolean = false;
  private countriesService = inject(CountriesService);
  private subscription?: Subscription;

  public searchData(value: string): void{
    this.loading = true;
   this.subscription = this.countriesService.searchByCapital(value).subscribe((countries: CountryResponse[]) => {
      console.log(countries);
      this.countries = countries;
      this.loading = false;
    })
  }


  ngOnDestroy(): void {
   this.subscription?.unsubscribe()
  }
}
