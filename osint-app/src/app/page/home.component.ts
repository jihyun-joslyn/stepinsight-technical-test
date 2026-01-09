import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule],
    templateUrl: 'home.component.html',
    //   styleUrls: ['./home.component.css']
})

export class HomePage {
    title = 'Welcome to the OSINT Game';

    startGame() {
        // navigation logic later
    }
}