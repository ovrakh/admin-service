import {FormGroup} from '@angular/forms';
export class PasswordValidation {

  static matchPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {
      [key: string]: boolean
    } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      console.log('Password ' + password.value + ' confirm Password = ' + confirmPassword.value)

      if ( password.value !== confirmPassword.value) {
        return {
          mismatch: true
        };
      }
    }
  }
}
