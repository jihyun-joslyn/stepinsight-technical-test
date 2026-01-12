import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent {
  title = 'osint-app';

  constructor(private firestore: Firestore) {
    console.log('Firestore ready', firestore);
  }

}
