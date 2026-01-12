import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GameStateService } from './game-state.service';
import { DialogComponent } from '../components/dialog.component';

@Injectable({
    providedIn: 'root'
})
export class AppFlowService {

    constructor(private router: Router, private dialog: MatDialog, private gameState: GameStateService) { }

    async homeBtnHandler(): Promise<boolean> {
        const ref = this.dialog.open(DialogComponent, {
            data: {
                title: 'Back To Home',
                content: 'Going back to home screen will terminate the game. Do you want go back to home screen?',
                confirmText: 'Confirm',
                cancelText: 'Cancel',
            },
            width: '420px',
        });

        ref.afterClosed().subscribe(result => {
            if (result) {
                this.gameState.terminateGame();
                this.router.navigate(['/']);
            }
        });

        return true;
    }
}
