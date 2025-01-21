import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrl: './add-edit-view.component.scss'
})
export class AddEditViewComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  showImage:boolean = true;

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
