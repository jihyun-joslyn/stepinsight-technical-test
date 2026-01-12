import { Injectable } from '@angular/core';
import { GameSession } from '../model/game.model';
import { Firestore, serverTimestamp, doc, updateDoc, addDoc, collection, getDoc, getDocs, } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class GameRepositoryService {
    constructor(private firestore: Firestore) {
    }

    async createGame(currGame: GameSession): Promise<string> {
        const gameRef = await addDoc(collection(this.firestore, 'games'), {
            startAt: serverTimestamp(),
            question: currGame.question,
            rounds: currGame.rounds
        });

        return gameRef.id;
    }

    async getGameDataById(id: string): Promise<any | null> {
        const ref = doc(this.firestore, 'games', id);

        const snap = await getDoc(ref);

        return snap.exists() ? snap.data() : null;
    }

    async saveGame(isEndGame: boolean, currGame: GameSession) {
        if (!currGame.id)
            return

        if (!isEndGame) {
            await updateDoc(
                doc(this.firestore, 'games', currGame.id),
                {
                    startAt: currGame.startAt,
                    question: currGame.question,
                    rounds: currGame.rounds,
                }
            );
        } else {
            await updateDoc(
                doc(this.firestore, 'games', currGame.id),
                {
                    startAt: currGame.startAt,
                    question: currGame.question,
                    rounds: currGame.rounds,
                    endAt: serverTimestamp()
                }
            );
        }
    }

    async getAllGameData() : Promise<any | null> {
        var result: any = [];

        var gamesRef = collection(this.firestore, 'games');
        var snap = await getDocs(gamesRef);

        result = snap.docs.map(d => ({
            ...d.data()
        }));

        return result;
    }
}