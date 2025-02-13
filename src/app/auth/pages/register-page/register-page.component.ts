import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import * as customValidators from '../../../shared/validators/validators'
import { ValidatorsService } from '../../../shared/services/validators.service'
import { EmailValidator } from '../../../shared/validators/email-validators.service'

@Component({
    selector: 'app-register-page',
    standalone: false,

    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
    private _fb = new FormBuilder()
    public myForm!: FormGroup

    constructor(
        private _validatorService: ValidatorsService,
        private _emailValidator: EmailValidator
    ) {
        this.createForm()
    }

    createForm(): void {
        this.myForm = this._fb.group(
            {
                name: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(
                            this._validatorService.firstNameAndLastnamePattern
                        ),
                    ],
                ],

                email: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(this._validatorService.emailPattern),
                    ],
                    [this._emailValidator],
                ],
                username: [
                    '',
                    [Validators.required, this._validatorService.cantBeStrider],
                ],
                password: ['', [Validators.required, Validators.minLength(6)]],
                password2: ['', [Validators.required]],
            },
            {
                validators: [
                    this._validatorService.isFieldOneEqualFieldTwo(
                        'password',
                        'password2'
                    ),
                ],
            }
        )
    }

    isInvalidField(field: string) {
        //todo obtener validación desde un servicio
        return this._validatorService.isInvalidField(this.myForm, field)
    }

    onSubmit(): void {
        console.log(this.myForm.value)
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched()
            return
        }
    }
}
