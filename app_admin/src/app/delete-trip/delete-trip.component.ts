import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';


@Component({
  selector: 'app-delete-trip',
  imports: [CommonModule],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css'
})
export class DeleteTripComponent implements OnInit {


  constructor(
    private router: Router,
    private tripService: TripDataService
  ) { }


  ngOnInit(): void {
    const confirmed = confirm('Are you sure you want to delete this trip?');
    const tripCode = localStorage.getItem('tripCode');
  
    if (!tripCode) {
      alert("Something went wrong — couldn't find the tripCode!");
      this.router.navigate(['']);
      return;
    }
  
    console.log('DeleteTripComponent found tripCode:', tripCode);
  
    if (confirmed) { //Confirmation before deleting
      this.tripService.deleteTrip(tripCode).subscribe({
        next: (response) => {
          console.log('Trip deleted:', response);
          localStorage.removeItem('tripCode');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error deleting trip:', err);
          alert('Failed to delete trip. Please try again.');
          this.router.navigate(['']);
        }
      });
    }
  }
}
