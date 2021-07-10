import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/data.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')]),
    confirmPassword: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })
  passwordMatch = true;
  user: User;
  selectedFile: File;

  constructor(private service: DataService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private storage: AngularFireStorage) { }

  get name() { return this.registerForm.get('name'); }

  get surname() { return this.registerForm.get('surname'); }

  get email() { return this.registerForm.get('email'); }

  get password() { return this.registerForm.get('password'); }

  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  get image() { return this.registerForm.get('image'); }

  get phone() { return this.registerForm.get('phone'); }

  get address() { return this.registerForm.get('address'); }


  ngOnInit(): void {

  }

  onSubmit(){

    if(this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.passwordMatch = true;
      this.user = {
        id: null,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        name: this.registerForm.value.name,
        surname: this.registerForm.value.surname,
        phone: this.registerForm.value.phone,
        address: this.registerForm.value.address,
        profilePictureUrl: null,
        favoriteCampaigns: null,
        joinedCampaigns: null,
      }

    var filePath = this.selectedFile.name;
    const fileRef = this.storage.ref(filePath);

    this.storage.upload(filePath, this.selectedFile).snapshotChanges()
    .pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.user.profilePictureUrl = url
          console.log(url)
          this.authService.register(this.user).subscribe(data => {
            if(data.body.statusCode === 200) {
              this.router.navigate(['/login'])
              this.toastr.success('User Registration Successfull! Please Login', 'Success')
            } else {
              this.toastr.error('Something went wrong!', 'Ooops')
            }
          })

        })
      })
    )
    .subscribe()

    } else {
      this.passwordMatch = false;
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
 }

}
