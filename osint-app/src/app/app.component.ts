import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from "./page/home.component";
import { HttpClient } from '@angular/common/http';
import { GamePage } from "./page/game.component";
import { ResultPage } from "./page/result.component";
import { EndPage } from "./page/end.component";
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage, GamePage, ResultPage, EndPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent {
  title = 'osint-app';
  
  constructor(private firestore: Firestore) {
    console.log('Firestore ready', firestore);
  }

}
