import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameStateService } from '../service/game-state.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LongLat } from '../model/location.model';

@Component({
    selector: 'map-component',
    templateUrl: 'map.component.html',
})

export class MapComponent implements AfterViewInit, OnChanges {
    @Input() userLongLat!: LongLat;
    @Input() corrLongLat!: LongLat;

    map?: L.Map;
    layerGrp?: L.LayerGroup;

    constructor(private http: HttpClient, private router: Router, private gameState: GameStateService) { }

    ngOnInit() { }

    ngAfterViewInit(): void {
        this.map = L.map('result-map', {
            center: [this.userLongLat.lat, this.userLongLat.lon],
            zoom: 4
        });

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors'
            }
        ).addTo(this.map);

        this.layerGrp = L.layerGroup().addTo(this.map);

        this.draw()
    }

    ngOnChanges(_: SimpleChanges): void {
        this.draw();
    }

    draw(): void {
        if (!this.map || !this.layerGrp) return;

        this.layerGrp.clearLayers();

        const guessIcon = L.icon({
            iconUrl: 'icons/user_pin.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
        });

        const actualIcon = L.icon({
            iconUrl: 'icons/ans_pin.png',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
        });


        var userMarker = L.marker([this.userLongLat.lat, this.userLongLat.lon], { icon: guessIcon }).bindPopup('Your guess');
        var corrMarker = L.marker([this.corrLongLat.lat, this.corrLongLat.lon], { icon: actualIcon }).bindPopup('Correct location');

        const line = L.polyline([
            [this.userLongLat.lat, this.userLongLat.lon],
            [this.corrLongLat.lat, this.corrLongLat.lon]], { weight: 3 })

        this.layerGrp.addLayer(userMarker);
        this.layerGrp.addLayer(corrMarker);
        this.layerGrp.addLayer(line);

        this.map.fitBounds(line.getBounds(), { padding: [20, 20] });
    }


}
