import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RoundResult } from '../model/game.model';
import { ActualLocation } from '../model/location.model';
import { MapComponent } from "../components/map.component";
import { AppFlowService } from '../service/app-flow.service';
import { GameStateService } from '../service/game-state.service';

@Component({
    selector: 'app-result',
    imports: [CommonModule, MatButtonModule, MatIconModule, MapComponent, MatCardModule],
    templateUrl: 'result.component.html',
    styleUrl: 'style/result.component.css',

})
export class ResultPage {
    isPlaying: boolean = false;
    roundNum = 0;
    roundResult: RoundResult = {
        round: 0,
        userInput: {
            lat: 0,
            lon: 0
        },
        distance: 0,
        points: 0
    };

    corrLoc: ActualLocation = {
        imagePath: "",
        coordinates: {
            lat: 0,
            lon: 0
        }
    };

    constructor(private router: Router, private gameState: GameStateService, private appFlow: AppFlowService) { }

    ngOnInit() {
        this.roundNum = this.gameState.currRound;
        this.isPlaying = this.gameState.isPlaying;

        this.roundResult = this.gameState.currGame.rounds[this.roundNum - 1];
        this.corrLoc = this.gameState.currGame.question[this.roundNum - 1];
    }

    async bottomBtnHandler() {
        if (this.isPlaying) {
            var temp = await this.gameState.nextRound();

            this.router.navigate(['/game']);
        } else 
            this.router.navigate(['/end']);
    }

    async homeBtnHandler() {
        var temp = await this.appFlow.homeBtnHandler();
    }
}
