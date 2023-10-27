import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = environment.mapbox_key;


@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[NavbarComponent,MapComponent]
})
export class SharedModule { }
