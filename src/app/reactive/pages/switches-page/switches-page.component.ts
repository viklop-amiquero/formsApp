import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-switches-page',
    standalone: false,

    templateUrl: './switches-page.component.html',
    styleUrl: './switches-page.component.css',
})
export class SwitchesPageComponent implements OnInit {
    private _fb = new FormBuilder()

    public person = {
        gender: 'F',
        wantNotifications: false,
    }

    ngOnInit(): void {
        this.myForm.reset(this.person)
    }

    public myForm: FormGroup = this._fb.group({
        gender: ['M', Validators.required],
        wantNotifications: [true, Validators.required],
        termsAndConditions: [false, Validators.requiredTrue],
    })

    isInvalidField(field: string): boolean | null {
        return (
            this.myForm.controls[field].errors &&
            this.myForm.controls[field].touched
        )
    }

    onSubmit(): void {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched()
            return
        }

        const { termsAndConditions, ...newPerson } = this.myForm.value

        this.person = newPerson
        console.log(this.person)
    }
}
