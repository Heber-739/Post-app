import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material/material.module';
import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = environment.mapbox_key;

import { MapComponent } from './components/map/map.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    MapComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports:[NavbarComponent,MapComponent,UserFormComponent]
})
export class SharedModule { }
