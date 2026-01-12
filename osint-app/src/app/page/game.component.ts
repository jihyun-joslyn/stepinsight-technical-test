import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog.component';
import { LongLat } from '../model/location.model';
import { firstValueFrom } from 'rxjs';
import { GameStateService } from '../service/game-state.service';
import { AppFlowService } from '../service/app-flow.service';


@Component({
    selector: 'app-game',
    imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatProgressBarModule],
    templateUrl: './game.component.html',
    styleUrl: 'style/game.component.css',

})
export class GamePage {
    readonly MAX_LAT = 90;
    readonly MIN_LAT = -90;
    readonly MAX_LON = 180;
    readonly MIN_LON = -180;

    imagePath = "";
    roundNum = 0;
    totalRound = 0;
    currProgress = 0

    constructor(private router: Router, private gameState: GameStateService, private dialog: MatDialog, private appFlow: AppFlowService) { }

    ngOnInit() {
        this.roundNum = this.gameState.currRound;
        this.imagePath = this.gameState.currGame.question[this.roundNum - 1].imagePath;
        this.totalRound = this.gameState.currGame.question.length;

        this.currProgress = this.roundNum / this.totalRound * 100;
    }

    locationForm = new FormGroup({
        lon: new FormControl<number | null>(
            null, [
            Validators.required,
            Validators.min(this.MIN_LON),
            Validators.max(this.MAX_LON)
        ]),
        lat: new FormControl<number | null>(
            null,
            [
                Validators.required,
                Validators.min(this.MIN_LAT),
                Validators.max(this.MAX_LAT)
            ])
    });

    async submitForm() {
        var userInput: LongLat = {
            lat: Number(this.locationForm.get('lat')?.value),
            lon: Number(this.locationForm.get('lon')?.value)
        }

        if (await this.formValidation(userInput)) {
            var temp = await this.gameState.roundComplete(userInput);

            this.router.navigate(['/result']);
        }

        console.log(this.locationForm)
    }

    async formValidation(userInput: LongLat): Promise<boolean> {
        var errorMessage = "";

        if (userInput.lat == 0 || userInput.lon == 0) {
            errorMessage = errorMessage + "Both fields are required";
        }

        if (userInput.lat > this.MAX_LAT || userInput.lat < this.MIN_LAT) {
            errorMessage = errorMessage + "The value of latitude should be a float between " + this.MIN_LAT.toString() + " to " + this.MAX_LAT.toString() + ". ";
        }

        if (userInput.lon > this.MAX_LON || userInput.lon < this.MIN_LON) {
            errorMessage = errorMessage + "The value of longtitude should be a float between " + this.MIN_LON.toString() + " to " + this.MAX_LON.toString() + ". ";
        }

        if (_.isEmpty(errorMessage))
            return true;

        const ref = this.dialog.open(DialogComponent, {
            data: {
                title: 'Submit Error',
                content: errorMessage,
                confirmText: 'Confirm',
            },
            width: '420px',
        });

        var temp = await firstValueFrom(ref.afterClosed());

        return false;
    }

    resetForm() {
        this.locationForm.reset();
    }

    async homeBtnHandler() {
        var temp = await this.appFlow.homeBtnHandler();
    }
}
