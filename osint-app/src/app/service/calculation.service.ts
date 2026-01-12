import { Injectable } from '@angular/core';
import {LongLat } from '../model/location.model';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})

export class CalculationService {
    readonly ROUND_MAX_POINTS = 15;
    readonly DISTANCE_WITH_POINTS = 50;

    constructor(private utilityService : UtilityService) { }

    haversineMeters(userLat: number, userLon: number, lat: number, lon: number): number {
        const R = 6371000;
        const dLat = this.utilityService.toRad(lat - userLat);
        const dLon = this.utilityService.toRad(lon - userLon);

        const a = Math.sin(dLat / 2) ** 2 + Math.cos(this.utilityService.toRad(userLat)) * Math.cos(this.utilityService.toRad(lat)) * Math.sin(dLon / 2) ** 2;

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