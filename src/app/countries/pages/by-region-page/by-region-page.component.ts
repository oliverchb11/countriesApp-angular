import { Component, OnInit, inject } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { Subscription } from 'rxjs';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  
  ]
})
export class ByRegionPageComponent implements OnInit{

  private countriesService = inject(CountriesService);
  private subscription?: Subscription;  
  public regions: CountryResponse[] = []
  public loading: boolean = false;
  public regionsArray: Region[]  = ['Africa', 'Americas', 'Asia', 'Europe','Oceania'];
  public selectedRegion?: Region;

  ngOnInit(): void {
    this.regions = this.countriesService.cacheStorage.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStorage.byRegion.region
  }

  public searchData(name: Region): void{
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
