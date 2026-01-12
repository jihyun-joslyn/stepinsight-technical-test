import { Injectable } from '@angular/core';
import { GameLeaderboard} from '../model/game.model';
import { GameRepositoryService } from './game-repository.service';

@Injectable({
    providedIn: 'root'
})

export class GameDataService {

    constructor(private gameRepositoryService: GameRepositoryService) { }

    async getLeaderboard(): Promise<GameLeaderboard[]> {
        var gameData = await this.gameRepositoryService.getAllGameData();

        var finishedGames = _.filter(gameData, d => {
            return d['rounds'].length == 3;
        });

        var result: GameLeaderboard[] = [];

        for (var i = 0; i < finishedGames.length; i++) {
            var tempTotal: number = 0;

            _.forEach(finishedGames[i]['rounds'], r => {
                tempTotal = tempTotal + r['points'];
            });

            var temp: GameLeaderboard = {
                rank: i + 1,
                total: tempTotal,
                startAt: finishedGames[i]['startAt'],
                endAt: finishedGames[i]['endAt'],
            };

            result.push(temp);
        }

        result = _.orderBy(result, r => r.total, 'desc');

        return result;
    }
}