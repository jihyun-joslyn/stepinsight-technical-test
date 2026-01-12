import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { GameStateService } from '../service/game-state.service';
import { GameDataService } from '../service/game-data.service';
import { GameLeaderboard } from '../model/game.model';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
    templateUrl: 'home.component.html',
    styleUrls: ['style/home.component.css']
})

export class HomePage {
    title = 'Welcome to the OSINT Game';
    leaderboard: GameLeaderboard[] = [];
    leaderboardKeys: string[] = [];


    constructor(private router: Router, private gameState: GameStateService, private gameDataService: GameDataService) {
        this.getLeaderboard();
    }

    async startGame() {
        var temp = await this.gameState.startGame();

        this.router.navigate(['/game']);
    }

    async getLeaderboard() {
        this.leaderboard = await this.gameDataService.getLeaderboard();

        this.leaderboardKeys = _.clone(Object.keys(this.leaderboard[0]));
    }
}