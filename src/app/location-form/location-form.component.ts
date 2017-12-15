import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'

import { FormsModule } from '@angular/forms';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

interface LocationResponse {
id: number, latitude: number, longitude: number
}
@Component({
      selector: 'add-location',
      template: `<table border="1" width="20%">
                <tr><td><input type="number" placeholder="latitude" name="latitudeText" [(ngModel)]="latitude" /></td>
                <td><input type="number" placeholder="longitude"name="longitudeText" [(ngModel)]="longitude" /></td>
                <td><button (click)="sendToServer()">Add</button></td></tr>
                </table>
                <p>{{msg}}</p>`
})

export class LocationFormComponent {
  @Output() locAdded = new EventEmitter<Object>();

  latitude: number
  longitude: number
  msg: string = ""

  private url = "http://localhost:8080/api/locations/"

 constructor(private http: HttpClient) {}

  sendToServer() {
      let body = {"latitude": this.latitude, "longitude": this.longitude}
      this.http.post<LocationResponse>(this.url, body, {observe: 'response'} )
      .subscribe(this.success.bind(this), this.error.bind(this))
    }
    error(err: HttpErrorResponse) {
    this.msg = "Some problem with saving data."
    }
    success(response : HttpResponse<LocationResponse>) {
    let locationObject : LocationResponse = response.body
    //this.msg = `Saved with an id of ${locationObject.id}`
    this.locAdded.emit(locationObject)
    }
  }

