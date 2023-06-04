import { Component, inject } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country-response.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  private countriesService = inject(CountriesService);
  public regions: CountryResponse[] = []

  public searchData(name: string): void{
    this.countriesService.searchByRegion(name).subscribe((regions)=> {
      this.regions = regions
    })
  }
}
