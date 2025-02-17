import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SensorData} from '../Models/SensorData';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SensorService {

    constructor(
        private readonly _http: HttpClient
    ) {}

    getSensorData(sensorName: string): Observable<SensorData[]> {
        return this._http.get<SensorData[]>(environment.sensorData + sensorName);
    }
}
