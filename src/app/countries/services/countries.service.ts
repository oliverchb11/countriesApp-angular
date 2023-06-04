import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CountryResponse } from '../interfaces/country-response.interface';
import { Observable, catchError, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private http = inject(HttpClient);
  constructor() { }


  private getCountriesRequest(url: string): Observable<CountryResponse[]>{
    return this.http.get<CountryResponse[]>(url).pipe(
      catchError(error => of([]))
     )
  }

  searchByCapital(capital: string): Observable<CountryResponse[]>{
    const url = `${environment.PATH}capital/${capital}`
    return this.getCountriesRequest(url)
  }
  searchByCountries(name: string): Observable<CountryResponse[]>{
    const url = `${environment.PATH}name/${name}`
    return this.getCountriesRequest(url)
  }
  searchByRegion(region: string): Observable<CountryResponse[]>{
    const url = `${environment.PATH}region/${region}`
    return this.getCountriesRequest(url)

  }
  searchByCode(code: string): Observable<CountryResponse | null>{
   return this.http.get<CountryResponse[]>(`${environment.PATH}alpha/${code}`)
   .pipe(
    map(countries => countries.length > 0 ? countries[0] : null),
    catchError(error => of(null))
   );
  }

}
