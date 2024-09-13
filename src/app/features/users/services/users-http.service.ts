import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {

  baseUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/persons`);
  }

  createUser(person: User): Observable<{message: string}> {
    return this.httpClient.post<{message: string}>(`${this.baseUrl}/api/person`, person);
  }


}
