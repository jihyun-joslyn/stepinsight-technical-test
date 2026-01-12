import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogContent } from '../model/component.model';

@Component({
    selector: 'dialog-popup',
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    templateUrl: 'dialog.component.html',

})

export class DialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public content: DialogContent,
        private dialogRef: MatDialogRef<DialogComponent>) { }

    close(isClosed: boolean) {
        this.dialogRef.close(isClosed);
    }
}