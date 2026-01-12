import { Injectable } from '@angular/core';
import { GameLeaderboard} from '../model/game.model';
import { DatasetService } from './dataset.service';
import { CalculationService } from './calculation.service';
import { GameRepositoryService } from './game-repository.service';

@Injectable({
    providedIn: 'root'
})

export class GameDataService {

    constructor(private datasetService: DatasetService, private calculationService: CalculationService, private gameRepositoryService: GameRepositoryService) { }

    async getLeaderboard(): Promise<GameLeaderboard[]> {
        var gameData = await this.gameRepositoryService.getAllGameData();

        var finshedGames = _.filter(gameData, d => {
            return d['rounds'].length == 3;
        });

        var sortedGames = _.orderBy(finshedGames, d => {
            var tempTotal: number = 0;

            for (var i = 0; i < d['rounds'].length; i++) {
                tempTotal = tempTotal + d['rounds']['points'];
            }

            return tempTotal;
        }, 'desc');

        var result: GameLeaderboard[] = [];

        for (var i = 0; i < sortedGames.length; i++) {
            var tempTotal: number = 0;

            _.forEach(sortedGames[i]['rounds'], r => {
                tempTotal = tempTotal + r['points'];
            });

            var temp: GameLeaderboard = {
                rank: i + 1,
                total: tempTotal,
                startAt: sortedGames[i]['startAt'],
                endAt: sortedGames[i]['endAt'],
            };

            result.push(temp);
        }

        return result;
    }
}