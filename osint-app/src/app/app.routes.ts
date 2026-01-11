import { Routes } from '@angular/router';
import { HomePage } from './page/home.component';
import { GamePage } from './page/game.component';
import { ResultPage } from './page/result.component';
import { EndPage } from './page/end.component';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'game', component: GamePage },
    { path: 'result', component: ResultPage },
    { path: 'end', component: EndPage },

];
