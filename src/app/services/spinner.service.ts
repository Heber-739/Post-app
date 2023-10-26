import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isLoading$ = new Subject<boolean>();

  public subscribeLoading():Observable<boolean>{
    return this.isLoading$.asObservable()
  }

  public show(): void {
    this.isLoading$.next(true);
  }

  public hide(): void {
    this.isLoading$.next(false);
  }

}
