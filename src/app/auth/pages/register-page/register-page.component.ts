import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as customValidators from '../../../shared/validators/validators'

@Component({
    selector: 'app-register-page',
    standalone: false,

    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
    private _fb = new FormBuilder()

    public myForm: FormGroup = this._fb.group({
        name: [
            '',
            [
                Validators.required,
                Validators.pattern(
                    customValidators.firstNameAndLastnamePattern
                ),
            ],
        ],
        email: [
            '',
            [
                Validators.required,
                Validators.pattern(customValidators.emailPattern),
            ],
        ],
        username: ['', [Validators.required, customValidators.cantBeStrider]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
    })

    isValidField(field: string) {
        //todo obtener validación desde un servicio
    }

    onSubmit(): void {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched()
            return
        }
    }
}
