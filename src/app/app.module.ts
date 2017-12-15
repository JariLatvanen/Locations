import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { LocationsComponent } from './locations/locations.component';

//import { LocationService } from './locations/location.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationFormComponent } from './location-form/location-form.component';

import { AgmCoreModule } from '@agm/core';
import { MapCompComponent } from './map-comp/map-comp.component';
import { StreetviewComponent } from './streetview/streetview.component';


@NgModule({
  declarations: [
    AppComponent, LocationsComponent, LocationFormComponent, MapCompComponent, StreetviewComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    AgmCoreModule.forRoot({
//          apiKey: 'AIzaSyAqnsWazTr4fZsE3WP6uY-467S-0eJdTtE'
          apiKey: 'AIzaSyBoop9urGV61yOiDuPEEhdL9m_coJWjTXg'
}) 
  ],
//  providers: [LocationService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
