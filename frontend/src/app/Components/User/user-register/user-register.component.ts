import { Component, OnInit } from '@angular/core';
import { UserForRegister } from 'src/app/Models/user';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/Services/validation.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  user: UserForRegister;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.authService.registerUser(this.getFormData())
      .subscribe(() =>
      {
          this.onReset();
          this.alertify.success('Congrats, you are successfully registered');
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  ngOnInit() {
    // Create form controls
    this.form = this.formBuilder.group(
      {
        userName: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['',
          [
            Validators.required, Validators.email
          ]
        ],
        mobile: ['',
          [
            Validators.required,
            Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
          ]
        ],
        password: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [ValidationService.match('password', 'confirmPassword')]
      }
    );
  }

  getFormData(): UserForRegister {

    return this.user = {
        userName: this.form.get("userName").value,
        email: this.form.get("email").value,
        mobile: this.form.get("mobile").value,
        password: this.form.get("password").value
    };
  }
}
