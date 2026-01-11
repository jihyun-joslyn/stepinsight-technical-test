import { ActualLocation, LongLat } from "./location.model";

export type RoundResult = {
    round: number;
    userInput: LongLat;
    distance: number;
    points: number;
}

export type GameSession = {
    id: string | null;
    startAt: Date | null;
    question: ActualLocation[];
    rounds: RoundResult[];
}