import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HomePage } from "./page/home.component";
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { GamePage } from "./page/game.component";
import { ResultPage } from "./page/result.component";
import { EndPage } from "./page/end.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatInputModule, HomePage, GamePage, ResultPage, EndPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {


}
