import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { GameStateService } from '../service/game-state.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MatButtonModule, MatIconModule,],
    templateUrl: 'home.component.html',
      styleUrls: ['style/home.component.css']
})

export class HomePage {
    title = 'Welcome to the OSINT Game';

    constructor(private router: Router, private gameState: GameStateService) {}

    async startGame() {
        var temp = await this.gameState.startGame();

        this.router.navigate(['/game']);
    }
}