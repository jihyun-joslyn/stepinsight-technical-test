import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
    constructor() { }

    toRad(deg: number): number {
        return (deg * Math.PI) / 180;
    }

}