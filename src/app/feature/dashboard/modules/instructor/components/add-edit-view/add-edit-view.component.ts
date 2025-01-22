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
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder
  ) {
    this.isViewMode = data.readOnly;
    this.form = this.createForm(data.fields);
  }
   

  private createForm(fields: any[]): FormGroup {
    const group: any = {};
    fields.forEach((field) => {
      group[field.name] = this.fb.control({
      value: field.name === 'user' && field.employee ? field.employee.id : field.value || '',
        disabled: this.isViewMode
      }, field.validators || []);
    });

    return this.fb.group(group);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }
  
}
