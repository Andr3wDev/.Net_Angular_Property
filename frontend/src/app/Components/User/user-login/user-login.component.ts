import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserForLogin } from 'src/app/Models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  user: UserForLogin;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  //loginForm: NgForm
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.authService.authUser(this.form.value).subscribe(
      (response: UserForLogin) => {
          console.log(response);
          const user = response;
          if (user) {
              localStorage.setItem('token', user.token);
              localStorage.setItem('userName', user.userName);
              this.alertify.success('Login Successful');
              this.router.navigate(['/']);
          }
      }
   );
  }

  ngOnInit() {
      // Create form controls
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  onCancel(){
    this.submitted = false;
    this.router.navigate(['/']);
  }
}
