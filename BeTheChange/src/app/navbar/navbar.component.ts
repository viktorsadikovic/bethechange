import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faUserCircle = faUserCircle
  isLogged = false;

  constructor(private service: DataService,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  logOut() {
    this.tokenService.logOut();
    this.isLogged = false;
    this.toastr.success('Logout successful', 'Success!')
    this.router.navigate(['/home'])
  }

  isAuthenticated() {
    return this.authService.checkUserLoggedIn()
  }

  getUserEmail() {
    return this.authService.getCurrentUser()?.email;
  }
}
