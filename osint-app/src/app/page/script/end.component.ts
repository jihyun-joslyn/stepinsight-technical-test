import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GameStateService } from '../../service/game-state.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-end',
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: '../end.component.html',
    styleUrl: '../style/end.component.css',

})
export class EndPage {
    marks = 0;

    constructor(private router: Router, private gameState: GameStateService) { }

    ngOnInit() {
        this.marks = this.gameState.currTotal;
    }

    homeBtnHandler() {
        this.router.navigate(['/']);
    }

    async newGameBtnHandler() {
        var temp = await this.gameState.newGame();

        this.router.navigate(['/game']);
    }
} 
