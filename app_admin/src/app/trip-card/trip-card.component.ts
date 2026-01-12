import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})

export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;

  constructor(private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void{}

  // Method to edit trip by code in list
  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  // Method to remove trip by code from list
  public deleteTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['delete-trip']);
  }

  // Method to check if user is logged in
  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}

