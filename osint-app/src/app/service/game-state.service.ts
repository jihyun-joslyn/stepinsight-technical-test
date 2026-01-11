import { Injectable } from '@angular/core';
import { GameSession, RoundResult } from '../model/game.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActualLocation, LongLat } from '../model/location.model';
import { Firestore, collection, addDoc, serverTimestamp, doc, updateDoc, endAt, getDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'   // makes this service a global singleton
})

export class GameStateService {
    readonly IMAGE_FOLDER = "images/";
    readonly DATASET_PATH = "dataset.json"
    readonly ROUND_MAX_POINTS = 15;
    readonly DISTANCE_WITH_POINTS = 50;

    locationDataset: ActualLocation[] = [];
    isPlaying: boolean = false;
    currTotal: number = 0;
    currRound: number = 0;

    currGame: GameSession = {
        id: null,
        startAt: null,
        question: [],
        rounds: [],
    };

    constructor(private http: HttpClient, private router: Router, private firestore: Firestore) {
        this.getLocationDataset().subscribe(d => {
            this.locationDataset = d;
        })
    }

    getLocationDataset(): Observable<ActualLocation[]> {
        return this.http.get<any[]>(this.DATASET_PATH).pipe(
            map(data =>
                data.map(d => ({
                    imagePath: this.IMAGE_FOLDER.concat(d.filename),
                    coordinates: {
                        lat: d.correctLat,
                        lon: d.correctLon
                    }
                }))
            )
        );
    }

    async startGame(): Promise<boolean> {
        this.isPlaying = true;

        this.shuffleQuestions();

        const gameRef = await addDoc(collection(this.firestore, 'games'), {
            startAt: serverTimestamp(),
            question: this.currGame.question,
            rounds: this.currGame.rounds
        });

        const snap = await getDoc(gameRef);
        this.currGame.startAt = snap.data()?.['startAt'];
        this.currGame.id = gameRef.id;

        this.currRound++;

        return true;
    }

    shuffleQuestions(): void {
        var tempData = _.shuffle(this.locationDataset);

        for (var i = 0; i < tempData.length; i++) {
            this.currGame.question.push(tempData[i]);
        }
    }

    async terminateGame() {
        this.isPlaying = false;

        if (!this.currGame.id) return

        this.saveGame(true);
        this.resetGame();
    }

    async roundComplete(userInput: LongLat): Promise<boolean> {
        var corrLocation: LongLat = this.currGame.question[this.currRound - 1].coordinates;

        var tempRound: RoundResult = {
            round: this.currRound,
            userInput: userInput,
            distance: 0,
            points: 0
        };

        var tempResult = this.calculatePoints(userInput, corrLocation);

        tempRound.distance = tempResult.distance;
        tempRound.points = tempResult.points;

        this.currGame.rounds.push(tempRound);

        if (this.currRound == 3)
            this.isPlaying = false;

        this.saveGame(!this.isPlaying);

        return true;
    }

    toRad(deg: number): number {
        return (deg * Math.PI) / 180;
    }

    haversineMeters(userLat: number, userLon: number, lat: number, lon: number): number {
        const R = 6371000;
        const dLat = this.toRad(lat - userLat);
        const dLon = this.toRad(lon - userLon);

        const a = Math.sin(dLat / 2) ** 2 + Math.cos(this.toRad(userLat)) * Math.cos(this.toRad(lat)) * Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    calculatePoints(userGuess: LongLat, correct: LongLat): { distance: number, points: number } {
        var distance = 0, points = 0;

        distance = this.haversineMeters(userGuess.lat, userGuess.lon, correct.lat, correct.lon);

        if (distance <= 50)
            points = Math.max(1, this.ROUND_MAX_POINTS * (1 - distance / this.DISTANCE_WITH_POINTS));

        this.currTotal = this.currTotal + points;

        return { distance, points };
    }

    async saveGame(isEndGame: boolean) {
        if (!this.currGame.id)
            return

        if (!isEndGame) {
            await updateDoc(
                doc(this.firestore, 'games', this.currGame.id),
                {
                    startAt: this.currGame.startAt,
                    question: this.currGame.question,
                    rounds: this.currGame.rounds,
                }
            );
        } else {
            await updateDoc(
                doc(this.firestore, 'games', this.currGame.id),
                {
                    startAt: this.currGame.startAt,
                    question: this.currGame.question,
                    rounds: this.currGame.rounds,
                    endAt: serverTimestamp()
                }
            );
        }
    }

    resetGame() {
        this.currGame.id = null;
        this.currGame.startAt = null;
        this.currGame.question = [];
        this.currGame.rounds = [];

        this.currRound = 0;
        this.currTotal = 0;
    }

    async nextRound() : Promise<boolean> {
        this.currRound++;

        return true;
    }

    async newGame() : Promise<boolean> {
        this.resetGame();

        this.startGame();

        return true;
    }

    // ====== METHODS (business logic) ======

    startNewGame(): void {
        // reset state, shuffle locations, etc.
    }

    updateGuess(lat: number, lng: number): void {
        // update currentGuess
    }

    completeRound(): void {
        // calculate score, move to next round
    }

    reset(): void {
        // clear all state
    }
}
