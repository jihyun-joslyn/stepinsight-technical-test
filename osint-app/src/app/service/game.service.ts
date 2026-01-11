import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GameService {
    readonly IMAGE_FOLDER = "images/";
    readonly DATASET_PATH = "dataset.json"
    
    constructor(private firestore: Firestore) { }


}