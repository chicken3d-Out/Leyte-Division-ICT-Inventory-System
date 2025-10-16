import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogActions,MatDialogContent,MatCard,MatButton,],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.css'
})
export class DeleteDialog {

  constructor(public dialogRef: MatDialogRef<DeleteDialog>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
