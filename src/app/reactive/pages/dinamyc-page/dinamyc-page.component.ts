import { Component } from '@angular/core'
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms'

@Component({
    selector: 'app-dinamyc-page',
    standalone: false,

    templateUrl: './dinamyc-page.component.html',
    styleUrl: './dinamyc-page.component.css',
})
export class DinamycPageComponent {
    private _fb = new FormBuilder()

    public myForm: FormGroup = this._fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        favoriteGames: this._fb.array([
            ['Metal Gear', Validators.required],
            ['Death Stranding', Validators.required],
        ]),
    })

    public newFavorite: FormControl = new FormControl('', Validators.required)

    get favoriteGames() {
        return this.myForm.get('favoriteGames') as FormArray
    }

    isInvalidField(field: string): boolean | null {
        return (
            this.myForm.controls[field].errors &&
            this.myForm.controls[field].touched
        )
    }

    isValidFieldInArray(formArray: FormArray, index: number) {
        return (
            formArray.controls[index].errors &&
            formArray.controls[index].touched
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

    onAddToFavorites(): void {
        if (this.newFavorite.invalid) return

        const newGame = this.newFavorite.value

        this.favoriteGames.push(this._fb.control(newGame, Validators.required))

        this.newFavorite.reset()
    }

    onDeleteFavorite(index: number): void {
        this.favoriteGames.removeAt(index)
    }

    onSubmit(): void {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched()
            return
        }

        ;(this.myForm.controls['favoriteGames'] as FormArray) = this._fb.array(
            []
        )

        this.myForm.reset()
    }
}
