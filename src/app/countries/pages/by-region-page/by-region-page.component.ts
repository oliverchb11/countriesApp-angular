import { Component, inject } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { Subscription } from 'rxjs';
type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  
  ]
})
export class ByRegionPageComponent {
  private countriesService = inject(CountriesService);
  private subscription?: Subscription;  
  public regions: CountryResponse[] = []
  public loading: boolean = false;
  public regionsArray: Region[]  = ['Africa', 'Americas', 'Asia', 'Europe','Oceania'];
  public selectedRegion?: Region;

  public searchData(name: Region): void{
    console.log(name);
    this.selectedRegion = name
    this.loading = true;
   this.subscription = this.countriesService.searchByRegion(name).subscribe((regions)=> {
      this.regions = regions
      this.loading = false;
    })
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
   }
}
