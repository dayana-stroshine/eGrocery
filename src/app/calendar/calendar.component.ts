import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '../shared/services/event.service';
import { Event } from '../shared/models/event.model'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  allEventRecipes: Event[];
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  availableDays: string[] = [];
  selectedDayRecipes: string[];
  selectedDay: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.allEventRecipes = this.activeRoute.snapshot.data.message[0];
    this.eventService.populateCalendar(this.allEventRecipes);

    for (const day of this.daysOfWeek) {
      if (this.eventService.currentCalendar.has(day.toLowerCase())) {
        this.availableDays.push(day);
      }
    }

    if (this.availableDays) {
      this.selectedDay = this.availableDays[0];
      this.selectedDayRecipes = this.eventService.currentCalendar.get(this.selectedDay.toLowerCase()).slice();
    }
  }

  onSelect(day: string) {
    this.selectedDay = day;
    this.selectedDayRecipes = this.eventService.currentCalendar.get(day.toLowerCase()).slice();
  }
}
