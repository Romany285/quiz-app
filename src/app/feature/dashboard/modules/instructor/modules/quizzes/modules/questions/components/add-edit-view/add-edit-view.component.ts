import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrl: './add-edit-view.component.scss'
})
export class AddEditViewComponent {
  isViewMode = false;
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEditViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
                                    private fb: FormBuilder
  ) {
    this.isViewMode = data.readOnly;
    this.form = this.createForm(data.fields);
  }

  private createForm(fields: any[]): FormGroup {
    const question: any = {};
    const options: any = {}

    fields.forEach((field) => {
      if (['A', 'B', 'C', 'D'].includes(field.name)) {
        options[field.name] = this.fb.control(field.value || '', field.validators || []);
        options[field.name] = field.value
      } else {
        if (field.name === 'type') {
          // For the 'type' field, we are setting it as a select control
          question[field.name] = this.fb.control(
            {
              value: field.value || '',
              disabled: this.isViewMode,
            },
            field.validators || []
          );
        } else {
            question[field.name] = this.fb.control(
                {
                  value: field.value || '',
                  disabled: this.isViewMode,
                },
                field.validators || []
            );
        }
      }
    });

    // Attach the options object to the question structure
    question['options'] = this.fb.control(options);
    return this.fb.group(question);
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }
  
}
