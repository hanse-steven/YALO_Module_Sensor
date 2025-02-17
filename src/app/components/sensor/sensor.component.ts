import {Component, OnInit} from '@angular/core';
import {SensorService} from '../../services/sensor.service';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-sensor',
    imports: [
        DecimalPipe
    ],
    templateUrl: './sensor.component.html',
    styleUrl: './sensor.component.css'
})
export class SensorComponent implements OnInit {
    temperature: number = -99;
    humidity: number = -99;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly sensorService: SensorService,
    ) {}

    ngOnInit(): void {
        const sensorId = this.route.snapshot.params['name']

        this.sensorService.getSensorData(sensorId).subscribe((data) => {
            //console.log(data)
            data.forEach((sensorData) => {
                console.log(sensorData)
                if (sensorData.field === "t") {
                    this.temperature = sensorData.value
                } else if (sensorData.field === "h") {
                    this.humidity = sensorData.value
                }
            })
        })
    }
}
