import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ActualLocation } from '../model/location.model';

@Injectable({
    providedIn: 'root'
})

export class DatasetService {
    readonly IMAGE_FOLDER = "images/";
    readonly DATASET_PATH = "dataset.json"

    dataset: ActualLocation[] = [];

    constructor(private http: HttpClient) { }

    init(): Promise<ActualLocation[]> {
        var result: Promise<ActualLocation[]>;

        if (this.dataset.length > 0) {
            return Promise.resolve(this.dataset);
        }

        result = firstValueFrom(this.getLocationDataset())
            .then(d => {
                this.dataset = d;
                return d;
            });

        return result;
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

    shuffleQuestions(): ActualLocation[] {
        var tempData = _.shuffle(this.dataset);

        return tempData;
    }
}