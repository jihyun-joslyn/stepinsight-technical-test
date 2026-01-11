import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { GameStateService } from '../service/game-state.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-end',
    imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatInputModule],
    templateUrl: './end.component.html',
    //   styleUrl: './app.component.css',

})
export class EndPage {
    marks = 0;

    constructor(private http: HttpClient, private router: Router, private gameState: GameStateService) { }

    ngOnInit() {
        this.marks = this.gameState.currTotal;
    }

    homeBtnHandler(){
        this.router.navigate(['/']);
    }

    async newGameBtnHandler() {
        var temp = await this.gameState.newGame();

        this.router.navigate(['/game']);
    }
} 
