
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private service: DataService) { }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public setToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  logOut(): void {
    localStorage.clear();
    // this.service.logout()
  }
}
