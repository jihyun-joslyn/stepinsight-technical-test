import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DialogContent } from '../model/component.model';

@Component({
    selector: 'dialog-popup',
    imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule],
    templateUrl: 'dialog.component.html',
    //   styleUrl: './app.component.css',

})

export class DialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public content: DialogContent,
        private dialogRef: MatDialogRef<DialogComponent>, private http: HttpClient, private router: Router
    ) { }

    close(isClosed: boolean) {
        this.dialogRef.close(isClosed);
    }
}