import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'

interface LocationResponse {
  id: number, latitude: number, longitude: number
  }

@Component({
  selector: 'app-map',
  template: `<agm-map id="myMap" (mapDblClick)="mapClicked($event)" style="height: 300px; width:50%"
              [latitude]="lat" [longitude]="lng" [streetViewControl]=true>
              <agm-marker *ngFor="let location of locations" [latitude]="location.latitude"
              [longitude]="location.longitude"></agm-marker>
              </agm-map>`
})

export class MapCompComponent implements OnInit {
  @Input() locations: Location[]
  @Output() locAdded = new EventEmitter<Object>();

  //starting centre
  lat : number =61.75;
  lng : number =23.75;

  private url = "http://localhost:8080/api/locations/"
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("mapinit")
    this.lat = 61.75
    this.lng = 23.75
  }

  mapClicked(event) {
  let body = {
    "latitude": event.coords.lat,
    "longitude": event.coords.lng
  }

  this.http.post < LocationResponse > (this.url, body, {observe: 'response'}).subscribe(this.success.bind(this), this.error.bind(this))
  }

  error(err : HttpErrorResponse) {}

  success(response : HttpResponse < LocationResponse >) {
  let locationObject : LocationResponse = response.body
  this.locAdded
    .emit({id: response.body.id, latitude: response.body.latitude, longitude: response.body.longitude})
  }
}