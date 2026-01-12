import { Injectable } from '@angular/core';
import { GameSession, RoundResult } from '../model/game.model';
import { LongLat } from '../model/location.model';
import { DatasetService } from './dataset.service';
import { CalculationService } from './calculation.service';
import { GameRepositoryService } from './game-repository.service';

@Injectable({
    providedIn: 'root'
})

export class GameStateService {
    isPlaying: boolean = false;
    currTotal: number = 0;
    currRound: number = 0;

    currGame: GameSession = {
        id: null,
        startAt: null,
        question: [],
        rounds: [],
    };

    constructor(private datasetService: DatasetService, private calculationService: CalculationService, private gameRepositoryService: GameRepositoryService) {
        this.datasetService.init();
    }

    async startGame(): Promise<boolean> {
        this.isPlaying = true;

        this.currGame.question = _.clone(this.datasetService.shuffleQuestions());

        this.currGame.id = await this.gameRepositoryService.createGame(this.currGame);

        var snap = await this.gameRepositoryService.getGameDataById(this.currGame.id);
        this.currGame.startAt = snap['startAt'];

        this.currRound++;

        return true;
    }

    async terminateGame() {
        this.isPlaying = false;

        if (!this.currGame.id) return

        this.gameRepositoryService.saveGame(true, this.currGame);
        this.resetGame();
    }

    async roundComplete(userInput: LongLat): Promise<boolean> {
        var corrLocation: LongLat = this.currGame.question[this.currRound - 1].coordinates;

        var tempRound: RoundResult = {
            round: this.currRound,
            userInput: userInput,
            distance: 0,
            points: 0
        };

        var tempResult = this.calculationService.calculatePoints(userInput, corrLocation);

        tempRound.distance = tempResult.distance;
        tempRound.points = tempResult.points;

        this.currTotal = this.currTotal + tempResult.points;

        this.currGame.rounds.push(tempRound);

        if (this.currRound == 3)
            this.isPlaying = false;

        this.gameRepositoryService.saveGame(!this.isPlaying, this.currGame);

        return true;
    }

    resetGame() {
        this.currGame.id = null;
        this.currGame.startAt = null;
        this.currGame.question = [];
        this.currGame.rounds = [];

        this.currRound = 0;
        this.currTotal = 0;
    }

    async nextRound(): Promise<boolean> {
        this.currRound++;

        return true;
    }

    async newGame(): Promise<boolean> {
        this.resetGame();
        this.startGame();

        return true;
    }
}
