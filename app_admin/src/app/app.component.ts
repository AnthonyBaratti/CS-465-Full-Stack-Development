import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import {RouterModule} from '@angular/router'; //Added to remove Error that
//Preventing me from launching the localhost:4200 with error
//X [ERROR] NG8001: 'router-outlet' is not a known element:
//##FIXME Investigate why this happened, it also changed the layout 
// of the page as well

@Component({
  selector: 'app-root',
  imports: [CommonModule, TripListingComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travlr Getaway Admin!';
}
