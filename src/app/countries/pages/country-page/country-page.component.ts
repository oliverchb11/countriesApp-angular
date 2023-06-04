import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Subscription, switchMap } from 'rxjs';
import { CountryResponse } from '../../interfaces/country-response.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit, OnDestroy{

  public country?: CountryResponse | null
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private countriesService = inject(CountriesService);
  private subscription?: Subscription;    

  ngOnInit(): void {
      this.paramsRoute()
  }

  public paramsRoute(): void{
   this.subscription = this.activedRoute.params.pipe(
      switchMap(({id})=> this.countriesService.searchByCode(id))
    ).subscribe((country)=> {
      if(!country) return this.router.navigateByUrl('')

     return this.country = country;

    })
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
   }
}
