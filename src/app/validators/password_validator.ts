import { FormGroup } from '@angular/forms';

export class PasswordValidator {
	
	public matching_password(passwordKey: string, confirmPasswordKey: string) {
		return (group: FormGroup): {[key: string]: any} => {
		  let password = group.controls[passwordKey];
		  let confirmPassword = group.controls[confirmPasswordKey];
	
		  if (password.value !== confirmPassword.value) {
			return {
			  mismatchedPasswords: true
			};
		  }
		}
	}
}