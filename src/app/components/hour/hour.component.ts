import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hour',
  imports: [],
  templateUrl: './hour.component.html',
  styleUrl: './hour.component.css'
})
export class HourComponent implements OnInit{
    hour: string = '--'
    minute: string = '--'
    date: string = '-- -- ----'

    ngOnInit(): void {
        this.updateClock()
        setInterval(() => this.updateClock(), 1000)
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
