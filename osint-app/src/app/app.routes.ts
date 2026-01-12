import { Routes } from '@angular/router';
import { HomePage } from './page/script/home.component';
import { GamePage } from './page/script/game.component';
import { ResultPage } from './page/script/result.component';
import { EndPage } from './page/script/end.component';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'game', component: GamePage },
    { path: 'result', component: ResultPage },
    { path: 'end', component: EndPage },
];
