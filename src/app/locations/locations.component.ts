import { Component, OnInit } from '@angular/core';
//import { LocationService } from './location.service';

import { HttpClient } from '@angular/common/http';

import { ItemResponse } from './itemresponse';

import { Input, Output, EventEmitter } from '@angular/core';

interface Location {
  id : number;
  latitude : number;
  longitude : number;
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html'
})

export class LocationsComponent implements OnInit {
  @Input() added: Location
  @Output() locs = new EventEmitter<Location[]>();
  @Output() loc = new EventEmitter<Location>();
  
  locations: Location[]
  private http: HttpClient
  private url: string

  id : number = 0;
  latitude : number = 0;
  longtitude : number = 0;

  
  constructor(http: HttpClient) { 
    this.http = http
  }
  
  ngOnInit() {
    this.http.get<Location[]>('http://localhost:8080/api/locations/').subscribe(jsonObject => {
      this.locations = jsonObject
      this.locs.emit(this.locations)
    });
  }

  //This updates the view. No http connection
  ngOnChanges() {
    if (this.added.id==null) {
      this.added.id=this.locations.length+1
    }
    this.locations.push({"id": this.added.id, "latitude": this.added.latitude, "longitude": this.added.longitude})
    this.locs.emit(this.locations)
  }

  //Delete from db and remove from view
  delete(event : string) {
    this.url='http://localhost:8080/api/locations/'+event
    this.http.delete(this.url, { observe: 'response', responseType: 'text' })
    .subscribe(jsonObject => {
          var i =+ event
          let index =+ this.locations.findIndex(this.byId(i));
          this.locations.splice(index, 1)
    })
  }
  
  byId(id) {
    return function(elem) {
      return elem.id === id;
    }
  }

  streetview(event : string) {
    var i =+ event
          let index =+ this.locations.findIndex(this.byId(i));
       this.loc.emit(this.locations[index])

  }
}
