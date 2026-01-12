import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { GameStateService } from '../service/game-state.service';
import { Router } from '@angular/router';
import { RoundResult } from '../model/game.model';
import { ActualLocation } from '../model/location.model';
import { AppFlowService } from '../service/app-flow.service';
import { MapComponent } from "../components/map.component";
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-result',
    imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatInputModule, MapComponent, MatCardModule],
    templateUrl: 'result.component.html',
    styleUrl: 'style/result.component.css',

})
export class ResultPage {
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

    constructor(private http: HttpClient, private router: Router, private gameState: GameStateService, private appFlow: AppFlowService) { }

    ngOnInit() {
        this.roundNum = this.gameState.currRound;

        this.roundResult = this.gameState.currGame.rounds[this.roundNum - 1];
        this.corrLoc = this.gameState.currGame.question[this.roundNum - 1];
    }

    async nextBtnHandler() {
        var temp = await this.gameState.nextRound();

        this.router.navigate(['/game']);
    }

    async homeBtnHandler() {
        var temp = await this.appFlow.homeBtnHandler();
    }
}
