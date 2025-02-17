import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
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
export class SensorComponent implements OnInit, AfterViewInit {
    temperature: number = -99;
    humidity: number = -99;

    private sensorId!: string;
    public sensorAlias!: string;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly sensorService: SensorService,
        private readonly elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        this.sensorId = this.route.snapshot.params['name']
        this.sensorAlias = this.route.snapshot.params['alias']
        setInterval(() => this.refreshData(), 30000)
        this.refreshData()
    }

    ngAfterViewInit(): void {
        const cardElement = this.elementRef.nativeElement.querySelector('.sensor-card');
        if (!cardElement) return;

        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const cardWidth = 250
        const cardHeight = 150

        const widthScale = (windowWidth * 0.8) / cardWidth
        const heightScale = (windowHeight * 0.8) / cardHeight

        const scale = Math.min(widthScale, heightScale)

        cardElement.style.setProperty('--card-scale', scale.toString())
    }

    refreshData(): void {
        this.sensorService.getSensorData(this.sensorId).subscribe((data) => {
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
