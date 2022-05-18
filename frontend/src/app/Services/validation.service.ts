import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static match(
    controlName: string,
    checkControlName: string): ValidatorFn {

    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control.value !== checkControl.value) {
        controls.get(checkControlName).setErrors({
          matching: true
        });
        return {
          matching: true
        };
      }
      else {
        return null;
      }
    };
  }
}

/*

// from example
passwordMatchingValidatior(fg: FormGroup): Validators {
  return fg.get('password').value === fg.get('confirmPassword').value ? null :
  {notmatched: true};
}

*/
