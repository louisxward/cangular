import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormConfig } from '../../state/table/table'

@Injectable()
export class FormService {
	constructor(private fb: FormBuilder) {}

	createSearchForm(formConfigs: FormConfig[]) {
		const formGroup: Record<string, any[]> = {}
		formConfigs.forEach((field) => {
			formGroup[field.name] = [
				field.value || '',
				field.required ? Validators.required : null,
			]
		})
		// ToDo fix this
		const temp = this.fb.group(formGroup, {
			validator: this.atLeastOneFieldValidator,
		})
		return temp
	}

	atLeastOneFieldValidator(formGroup: FormGroup) {
		const controls = formGroup.controls
		if (Object.values(controls).some((control) => control.value)) {
			return null
		} else {
			return { atLeastOneRequired: true }
		}
	}
}
