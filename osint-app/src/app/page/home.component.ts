import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { GameStateService } from '../service/game-state.service';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatCardModule, MatGridListModule],
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