import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';import {  Map, Marker } from 'mapbox-gl';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-map',
  template: `<div #map class="map"></div>`,
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map!: Map;
  private marker!: Marker;

  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat: [number, number] = [-12, -54];
  @Input() editMode: boolean = false;
  @Output() emitCoords = new EventEmitter<[number, number]>();

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.createMap();
  }

  private createMap(): void {
    if (!this.lngLat) return;
    if (!this.divMap) return;

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 12,
      interactive: this.editMode,
    });
    this.marker = new Marker();
    if (this.editMode) {
      this.marker = new Marker({ draggable: true });
      this.getUbication();
    }
    this.renderer.listen(this.divMap.nativeElement, 'mouseup', () => {
      const coord = this.marker.getLngLat();
      this.emitCoords.emit([coord.lng, coord.lat]);
    });
    this.setUbication();
    this.marker.addTo(this.map);
  }

  private setUbication(): void {
    this.marker.setLngLat(this.lngLat);
    this.map.flyTo({
      zoom: 12,
      center: this.lngLat,
    });
  }

  private getUbication(): void {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.lngLat = [coords.longitude, coords.latitude];
        this.setUbication();
      },
      (err) => {
        Swal.fire({
          title: 'No se pudo conectar a la ubicación',
          icon: 'error',
        });
      }
    );
  }
}
