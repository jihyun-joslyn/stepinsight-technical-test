import { Injectable } from '@angular/core';
import { GameSession, RoundResult } from '../model/game.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActualLocation, LongLat } from '../model/location.model';
import { Firestore, collection, addDoc, serverTimestamp, doc, updateDoc, endAt, getDoc } from '@angular/fire/firestore';
import { DatasetService } from './dataset.service';

@Injectable({
    providedIn: 'root'
})

export class CalculationService {
    readonly ROUND_MAX_POINTS = 15;
    readonly DISTANCE_WITH_POINTS = 50;

    constructor(private http: HttpClient, private router: Router, private firestore: Firestore, private datasetService: DatasetService) {
        this.datasetService.init();
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

        return { distance, points };
    }

}