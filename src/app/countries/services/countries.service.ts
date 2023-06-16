import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CountryResponse } from '../interfaces/country-response.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { cacheStorage } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private http = inject(HttpClient);

  public cacheStorage: cacheStorage = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []},
  }
  constructor() {
    console.log('country service init');
    
   }


  private getCountriesRequest(url: string): Observable<CountryResponse[]>{
    return this.http.get<CountryResponse[]>(url).pipe(
      catchError(error => of([]))
     )
  }

  searchByCapital(capital: string): Observable<CountryResponse[]>{
    const url = `${environment.PATH}capital/${capital}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStorage.byCapital = {term: capital, countries})
    )
  }
  searchByCountries(name: string): Observable<CountryResponse[]>{
    const url = `${environment.PATH}name/${name}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStorage.byCountries = {term: name, countries})
    )
  }
  searchByRegion(region: Region): Observable<CountryResponse[]>{
    const url = `${environment.PATH}region/${region}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(regio => this.cacheStorage.byRegion = {region , countries: regio })
    )

  }
  searchByCode(code: string): Observable<CountryResponse | null>{
   return this.http.get<CountryResponse[]>(`${environment.PATH}alpha/${code}`)
   .pipe(
    map(countries => countries.length > 0 ? countries[0] : null),
    catchError(error => of(null))
   );
  }


  //localStorage

  setLocalStorage(key: string, data: any): void{
    localStorage.setItem(key, JSON.stringify(data))
  }
  setLocalStorageString(key: string, data: string): void{
    localStorage.setItem(key, data)
  }

  getLocalStorage(key: string): any{
    return  JSON.parse(localStorage.getItem(key)!)
  }
  getLocalStorageString(key: string): string{
    return  localStorage.getItem(key)!
  }

  removeLocalStorage(key: string): void{
    localStorage.removeItem(key)
  }

}
