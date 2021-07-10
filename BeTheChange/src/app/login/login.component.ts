import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';
import { TokenService } from '../shared/token.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private service: DataService,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let loginDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.login(loginDto).subscribe(data => {
      if(data.statusCode === 200){
        this.authService.updateUser(data.user)
        this.tokenService.setToken(data.token)
        this.toastr.success('Login Successful', 'Success!')
        this.router.navigate(['/home/all'])
      } else {
        this.toastr.error('Invalid credentials', 'Ooops!')
      }
    })
  }
}
