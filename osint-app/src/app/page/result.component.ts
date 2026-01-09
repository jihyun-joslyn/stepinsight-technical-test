import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-result',
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatInputModule],
  templateUrl: 'result.component.html',
//   styleUrl: './app.component.css',

})
export class ResultPage {
  roundNum = 0;
  distance = 0;
  marks = 0;

}
