import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CountryResponse } from '../interfaces/country-response.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private http = inject(HttpClient);
  constructor() { }

  searchByCapital(capital: string): Observable<CountryResponse[]>{
   return this.http.get<CountryResponse[]>(`${environment.PATH}capital/${capital}`)
   .pipe(
    catchError(error => of([]))
   )
  }
  searchByCountries(name: string): Observable<CountryResponse[]>{
   return this.http.get<CountryResponse[]>(`${environment.PATH}name/${name}`)
   .pipe(
    catchError(error => of([]))
   )
  }
  searchByRegion(region: string): Observable<CountryResponse[]>{
   return this.http.get<CountryResponse[]>(`${environment.PATH}region/${region}`)
   .pipe(
    catchError(error => of([]))
   )
  }
  searchByCode(code: string): Observable<CountryResponse | null>{
   return this.http.get<CountryResponse[]>(`${environment.PATH}alpha/${code}`)
   .pipe(
    map(countries => countries.length > 0 ? countries[0] : null),
    catchError(error => of(null))
   );
  }

}
