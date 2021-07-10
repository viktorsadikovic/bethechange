import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiAuth = "https://bethechangebackend.herokuapp.com/auth/"


  login(loginDto) {
    return this.http.post<any>(this.apiAuth + "login", loginDto)
  }

  register(user) {
    return this.http.post<any>(this.apiAuth + "register", user, {observe: 'response' })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"))
  }

  updateUser(newUser){
    localStorage.removeItem("user")
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  checkUserLoggedIn() {
    if(localStorage.getItem("AuthToken") === null || localStorage.getItem("AuthToken") ===  undefined) {
      return false;
    } else {
      return true;
    }
  }
}
