import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-hour',
  imports: [],
  templateUrl: './hour.component.html',
  styleUrl: './hour.component.css'
})
export class HourComponent implements OnInit, AfterViewInit{
    hour: string = '--'
    minute: string = '--'
    date: string = '-- -- ----'

    constructor(private readonly elementRef: ElementRef) {}


    ngOnInit(): void {
        this.updateClock()
        setInterval(() => this.updateClock(), 10000)
    }

    ngAfterViewInit(): void {
        const cardElement = this.elementRef.nativeElement.querySelector('.clock-card');
        if (!cardElement) return;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const cardWidth = 300
        const cardHeight = 120

        const widthScale = (windowWidth * 0.8) / cardWidth
        const heightScale = (windowHeight * 0.8) / cardHeight

        const scale = Math.min(widthScale, heightScale)

        cardElement.style.setProperty('--card-scale', scale.toString())
    }

    updateClock = () => {
        const now = new Date()
        this.hour = String(now.getHours()).padStart(2, '0')
        this.minute = String(now.getMinutes()).padStart(2, '0')

        this.date = now.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }
}
