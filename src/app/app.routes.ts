import { Routes } from '@angular/router';
import {SensorComponent} from './components/sensor/sensor.component';
import {HourComponent} from './components/hour/hour.component';

export const routes: Routes = [
  { path: 'sensor/:name/:alias', component: SensorComponent },
  { path: 'hour', component: HourComponent },
];
