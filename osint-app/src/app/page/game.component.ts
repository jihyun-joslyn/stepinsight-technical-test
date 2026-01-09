import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-game',
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatInputModule],
  templateUrl: './game.component.html',
//   styleUrl: './app.component.css',

})
export class GamePage {
  readonly IMAGE_FOLDER = "images/";
  readonly DATASET_PATH = "dataset.json"
  imagePath = "";
  roundNum = 0;
  totalRound = 0;

  dataset: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(this.DATASET_PATH).subscribe(data => {
      this.dataset = data;
      this.totalRound = this.dataset.length;
      this.imagePath = this.IMAGE_FOLDER.concat(this.dataset[this.roundNum].filename);

      console.log(this.dataset);
      console.log(this.dataset.length);

    });
  }
}
