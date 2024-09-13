import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class LocationsHttpService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.baseUrl}/api/countries`);
  }

  getCities(countryId: string): Observable<City[]> {
    return this.httpClient.get<City[]>(`${this.baseUrl}/api/cities/${countryId}`);
  }

  createCity(city: City): Observable<{message: string}> {
    return this.httpClient.post<{message: string}>(`${this.baseUrl}/api/city`, city);
  }
}
