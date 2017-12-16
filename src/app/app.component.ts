import { Component } from '@angular/core';

interface Location {
  id : number;
  latitude : number;
  longitude : number;
}

@Component({
  selector: 'app-root',
  template: `<h1>{{title}}</h1>
             <p>Today is {{dateVar | date:'yyy-MM-dd'}}</p>
             <div>
             <p>Add locations by giving the coordinates or by double-clicking on the map.</p>  
             <p>The "Street" button will show you a street view of the location if available.</p>  
             <app-streetview [location]=loc></app-streetview>
             <app-map (locAdded)="added($event)" [locations]=locations></app-map><br/>
             <app-locations (locs)="addlocs($event)"  (loc)="viewloc($event)" [added]="add"></app-locations><br>
             <add-location (locAdded)="added($event)"></add-location>
             </div>`
             
})

export class AppComponent {
  title = 'One more locations-app';
  dateVar : Date = new Date()
  add : Object = ""

  locations: Object[] = []
  loc: Location
  
  added(event: Object) {
    this.add=event;
  }

  addlocs(event: Object[]) {
    this.locations = event;
      console.log(this.locations)
    }

  viewloc(event: Location) {
      this.loc = event;
        console.log(this.loc.latitude)
      }
  

  }
