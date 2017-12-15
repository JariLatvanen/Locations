import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
//import { google } from '@agm/core/services/google-maps-types';
import { Input, Output, EventEmitter } from '@angular/core';

declare const google: any;

interface Location {
  id : number;
  latitude : number;
  longitude : number;
}

@Component({
  selector: 'app-streetview',
  templateUrl: './streetview.component.html',
  styleUrls: ['./streetview.component.css']
})

export class StreetviewComponent implements OnInit {
  @Input() location: Location
  
  loc : Object = null
  
  initMap() {
    console.log("initmap:" + this.location)

   if (typeof this.location !== 'undefined') {
   this.loc = {lat: this.location.latitude, lng: this.location.longitude};
   
   var map = new google.maps.Map(document.getElementById('street'), {
      center: this.loc,
      zoom: 14      
    });
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street"), {
          position: this.loc,
          pov: {
            heading: 34,
            pitch: 10
          }
        });
    map.setStreetView(panorama);
   }
  }
  
   
  constructor() {
    this.loc = {lat: 61.75, lng: 23.75};
  }

  ngOnInit() {
    console.log("on init")
    this.initMap();
  }

  ngOnChanges() {
    console.log("on changes")
    this.initMap();
  }

}

