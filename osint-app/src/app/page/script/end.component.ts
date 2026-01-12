import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GameStateService } from '../../service/game-state.service';
import { Router } from '@angular/router';
import { RoundResult } from '../../model/game.model';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-end',
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
    templateUrl: '../end.component.html',
    styleUrl: '../style/end.component.css',

})
export class EndPage {
    marks = 0;
    roundResult: {
        round: number, 
        points: number, 
        distance: number
    }[] = [];
    roundResultKeys: string[] = [];

    constructor(private router: Router, private gameState: GameStateService) { }

    ngOnInit() {
        this.marks = this.gameState.currTotal;
        this.roundResult = this.gameState.currGame.rounds.map(r => ({
            round: r.round,
            points: r.points,
            distance: r.distance
        }));

        this.roundResultKeys = _.clone(Object.keys(this.roundResult[0]));
    }

    homeBtnHandler() {
        this.router.navigate(['/']);
    }

    async newGameBtnHandler() {
        var temp = await this.gameState.newGame();

        this.router.navigate(['/game']);
    }
} 
