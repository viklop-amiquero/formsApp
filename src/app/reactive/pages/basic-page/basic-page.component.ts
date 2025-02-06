import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

const product = {
    name: 'RTX 5990',
    price: 2570,
    inStorage: 5,
}
@Component({
    selector: 'app-basic-page',
    standalone: false,

    templateUrl: './basic-page.component.html',
    styleUrl: './basic-page.component.css',
})
export class BasicPageComponent implements OnInit {
    private _fb: FormBuilder = new FormBuilder()

    public myForm: FormGroup = this._fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: [0, [Validators.required, Validators.min(0)]],
        inStorage: [0, [Validators.required, Validators.min(0)]],
    })

    ngOnInit(): void {
        // this.myForm.reset(product)
    }

    isInvalidField(field: string): boolean | null {
        return (
            this.myForm.controls[field].errors &&
            this.myForm.controls[field].touched
        )
    }

    getFieldError(field: string): string | null {
        if (!this.myForm.controls[field]) return null
        const errors = this.myForm.controls[field].errors || {}

        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido.'

                case 'minlength':
                    return `Mínimo ${errors['minlength'].requiredLength} caracteres.`
            }
        }

        return null
    }

    onSave(): void {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched()
            return
        }
        this.myForm.reset({ price: 0, inStorage: 0 })
    }
}
