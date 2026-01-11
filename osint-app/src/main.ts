import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as L from 'leaflet';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
//   iconUrl: '/assets/leaflet/marker-icon.png',
//   shadowUrl: '/assets/leaflet/marker-shadow.png',
// });